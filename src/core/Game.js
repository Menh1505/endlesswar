// ============================================================================
// GAME - Logic game chính
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/constants.js';
import { GameState } from './GameState.js';
import { InputManager } from './InputManager.js';
import { Renderer } from './Renderer.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';
import { EnemyBullet } from '../entities/EnemyBullet.js';
import { Obstacle } from '../entities/Obstacle.js';
import { isColliding } from '../utils/collision.js';
import { UPGRADES } from '../config/upgradeConfig.js';
import { getCampaignLevel } from '../config/campaignLevels.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Setup canvas size
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        // Core systems
        this.gameState = new GameState();
        this.inputManager = new InputManager();
        this.renderer = new Renderer(this.ctx);

        // Game entities
        this.player = null;
        this.bullets = [];
        this.enemies = [];
        this.enemyBullets = [];
        this.obstacles = [];

        // Spawn timing
        this.lastSpawnTime = 0;
        this.spawnInterval = 800; // 800ms giữa mỗi enemy

        // Campaign data
        this.currentLevelData = null;

        // Callbacks
        this.onGameEnd = null;
        this.onLevelComplete = null;
        this.onPause = null;

        // Bind methods
        this.gameLoop = this.gameLoop.bind(this);
        this.handleReload = this.handleReload.bind(this);
        this.handleWeaponSwitch = this.handleWeaponSwitch.bind(this);
        this.handleUpgradeSelect = this.handleUpgradeSelect.bind(this);
        this.handlePause = this.handlePause.bind(this);
    }

    init() {
        // Setup input
        this.inputManager.setupInput(
            this.canvas,
            this.handleReload,
            this.handleWeaponSwitch,
            this.handleUpgradeSelect,
            this.handlePause
        );

        // Initialize game
        this.initGame();

        // Start game loop
        requestAnimationFrame(this.gameLoop);
    }

    startEndlessMode() {
        this.gameState.reset('endless');
        this.currentLevelData = null;
        this.initGame();
    }

    startCampaignMode(level = 1) {
        this.gameState.reset('campaign', level);
        this.currentLevelData = getCampaignLevel(level);
        this.initGame();
        this.spawnCampaignEnemies();
    }

    initGame() {
        // Clear arrays
        this.bullets = [];
        this.enemies = [];
        this.enemyBullets = [];
        this.obstacles = [];

        // Create player
        this.player = new Player(
            CANVAS_WIDTH / 2 + 50,
            CANVAS_HEIGHT / 2 + 50,
            this.inputManager,
            this.gameState,
            this.bullets,
            this.obstacles
        );

        // Create obstacles based on mode
        if (this.gameState.gameMode === 'campaign' && this.currentLevelData) {
            this.createCampaignObstacles();
        } else {
            this.createDefaultObstacles();
        }
    }

    createDefaultObstacles() {
        this.obstacles.push(new Obstacle(200, 150, 80, 80));
        this.obstacles.push(new Obstacle(CANVAS_WIDTH - 280, 150, 80, 80));
        this.obstacles.push(new Obstacle(200, CANVAS_HEIGHT - 230, 80, 80));
        this.obstacles.push(new Obstacle(CANVAS_WIDTH - 280, CANVAS_HEIGHT - 230, 80, 80));
        this.obstacles.push(new Obstacle(CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT / 2 - 50, 100, 100));
    }

    createCampaignObstacles() {
        if (!this.currentLevelData || !this.currentLevelData.obstacles) return;

        for (const obs of this.currentLevelData.obstacles) {
            this.obstacles.push(new Obstacle(obs.x, obs.y, obs.width, obs.height));
        }
    }

    spawnCampaignEnemies() {
        if (!this.currentLevelData || !this.currentLevelData.enemies) return;

        for (const enemyData of this.currentLevelData.enemies) {
            const enemy = new Enemy(
                enemyData.x,
                enemyData.y,
                1, // Campaign enemies don't scale with wave
                this.player,
                this.obstacles,
                this.gameState,
                this.enemyBullets,
                enemyData.type
            );
            this.enemies.push(enemy);
        }

        this.gameState.totalEnemiesInLevel = this.enemies.length;
    }

    handleReload() {
        if (this.gameState.isGameOver) {
            // Retry current mode/level
            if (this.gameState.gameMode === 'endless') {
                this.startEndlessMode();
            } else {
                this.startCampaignMode(this.gameState.currentLevel);
            }
        } else {
            this.player.reload();
        }
    }

    handleWeaponSwitch(weaponType) {
        if (!this.gameState.isGameOver) {
            // Campaign mode always allows weapon switch, endless only during playing state
            if (this.gameState.gameMode === 'campaign' || this.gameState.waveState === 'playing') {
                this.player.switchWeapon(weaponType);
            }
        }
    }

    handleUpgradeSelect(index) {
        if (this.gameState.waveState === 'break' && index < this.gameState.upgradeOptions.length) {
            const upgradeId = this.gameState.upgradeOptions[index];
            this.gameState.selectUpgrade(upgradeId);

            // Apply upgrade
            const upgrade = UPGRADES[upgradeId];
            upgrade.effect(this.player);

            // Skip break and start next wave
            this.gameState.skipBreak();
            this.gameState.startWave(this.gameState.wave + 1);
        }
    }

    handlePause() {
        // Only allow pause during active gameplay
        if (!this.gameState.isGameOver && !this.gameState.isLevelComplete) {
            this.togglePause();
        }
    }

    togglePause() {
        this.gameState.isPaused = !this.gameState.isPaused;

        if (this.onPause) {
            this.onPause(this.gameState.isPaused);
        }
    }

    resumeGame() {
        this.gameState.isPaused = false;
    }

    getRandomEnemyType() {
        const config = this.gameState.currentWaveConfig;
        if (!config) return 'normal';

        const rand = Math.random();
        let cumulative = 0;

        for (const [type, prob] of Object.entries(config.composition)) {
            cumulative += prob;
            if (rand <= cumulative) {
                return type;
            }
        }

        return 'normal';
    }

    spawnEnemy(type = null) {
        // Spawn ở các cạnh ngẫu nhiên
        const side = Math.floor(Math.random() * 4);
        let x, y;

        switch (side) {
            case 0: // Top
                x = Math.random() * CANVAS_WIDTH;
                y = -50;
                break;
            case 1: // Right
                x = CANVAS_WIDTH + 50;
                y = Math.random() * CANVAS_HEIGHT;
                break;
            case 2: // Bottom
                x = Math.random() * CANVAS_WIDTH;
                y = CANVAS_HEIGHT + 50;
                break;
            case 3: // Left
                x = -50;
                y = Math.random() * CANVAS_HEIGHT;
                break;
        }

        const enemyType = type || this.getRandomEnemyType();

        this.enemies.push(new Enemy(
            x,
            y,
            this.gameState.wave,
            this.player,
            this.obstacles,
            this.gameState,
            this.enemyBullets,
            enemyType
        ));

        this.gameState.enemiesSpawned++;
    }

    update(dt) {
        if (!this.gameState.isRunning) return;

        // === PAUSE CHECK ===
        if (this.gameState.isPaused) return;

        // === HANDLE WAVE STATES (Endless mode only) ===
        if (this.gameState.gameMode === 'endless' && this.gameState.waveState === 'break') {
            // Update break timer
            this.gameState.updateBreakTimer(dt);

            // Update mouse hover for upgrade cards
            this.renderer.hoveredUpgrade = this.renderer.checkUpgradeHover(
                this.inputManager.mouse.x,
                this.inputManager.mouse.y,
                this.gameState.upgradeOptions.length
            );

            return; // Don't update game during break
        }

        // === UPDATE PLAYER ===
        this.player.update(dt);

        // === UPDATE BULLETS ===
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update(dt);
            if (this.bullets[i].isDead) {
                this.bullets.splice(i, 1);
            }
        }

        // === UPDATE ENEMIES ===
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].update(dt);
            if (this.enemies[i].isDead) {
                this.enemies.splice(i, 1);
            }
        }

        // === UPDATE ENEMY BULLETS ===
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            this.enemyBullets[i].update(dt);
            if (this.enemyBullets[i].isDead) {
                this.enemyBullets.splice(i, 1);
            }
        }

        // === COLLISION: Bullet vs Enemy ===
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                if (isColliding(this.bullets[i], this.enemies[j])) {
                    this.enemies[j].takeDamage(this.bullets[i].damage);
                    this.bullets[i].isDead = true;
                    break;
                }
            }
        }

        // === COLLISION: Enemy Bullet vs Player ===
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            if (isColliding(this.enemyBullets[i], this.player)) {
                this.player.takeDamage(this.enemyBullets[i].damage);
                this.enemyBullets[i].isDead = true;
            }
        }

        // === SPAWN ENEMIES (Endless mode only) ===
        if (this.gameState.gameMode === 'endless') {
            if (this.gameState.enemiesSpawned < this.gameState.enemiesToSpawn) {
                const now = Date.now();
                if (now - this.lastSpawnTime >= this.spawnInterval) {
                    // Check if this is a boss wave and we haven't spawned boss yet
                    if (this.gameState.currentWaveConfig.boss &&
                        this.gameState.enemiesSpawned === this.gameState.enemiesToSpawn - 1) {
                        this.spawnEnemy('boss');
                    } else {
                        this.spawnEnemy();
                    }
                    this.lastSpawnTime = now;
                }
            }

            // === CHECK WAVE COMPLETE ===
            if (this.gameState.waveState === 'playing' && this.gameState.isWaveComplete()) {
                this.gameState.completeWave();
            }
        }

        // === CHECK CAMPAIGN LEVEL COMPLETE ===
        if (this.gameState.gameMode === 'campaign') {
            if (this.enemies.length === 0 && this.gameState.totalEnemiesInLevel > 0 && !this.gameState.isLevelComplete) {
                this.gameState.isLevelComplete = true;
                this.gameState.isRunning = false;
                if (this.onLevelComplete) {
                    this.onLevelComplete(this.gameState.currentLevel, this.gameState.score);
                }
            }
        }

        // === CHECK GAME OVER ===
        if (this.player.hp <= 0 && !this.gameState.isGameOver) {
            this.gameState.isGameOver = true;
            this.gameState.isRunning = false;
            if (this.onGameEnd) {
                this.onGameEnd(false, this.gameState.score, this.gameState.wave);
            }
        }

        // === SCREEN SHAKE ===
        this.gameState.decreaseScreenShake();
    }

    draw() {
        // === CLEAR CANVAS ===
        this.renderer.clear();

        // === SCREEN SHAKE EFFECT ===
        const hasShake = this.renderer.applyScreenShake(this.gameState.screenShake);

        // === DRAW GRID ===
        this.renderer.drawGrid();

        // === DRAW ENTITIES ===
        this.renderer.drawEntities(this.obstacles);
        this.renderer.drawEntities(this.bullets);
        this.renderer.drawEntities(this.enemyBullets);
        this.renderer.drawEntities(this.enemies);
        this.player.draw(this.ctx);

        if (hasShake) {
            this.renderer.restoreScreenShake();
        }

        // === DRAW HUD ===
        this.renderer.drawHUD(this.player, this.gameState);

        // === DRAW WAVE BREAK (Endless only) ===
        if (this.gameState.gameMode === 'endless' && this.gameState.waveState === 'break') {
            this.renderer.drawWaveBreak(this.gameState);
        }

        // === DRAW CAMPAIGN INFO ===
        if (this.gameState.gameMode === 'campaign' && this.currentLevelData) {
            this.renderer.drawCampaignInfo(this.currentLevelData, this.enemies.length, this.gameState);
        }
    }

    gameLoop(timestamp) {
        const dt = timestamp - this.gameState.lastTime;
        this.gameState.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame(this.gameLoop);
    }
}
