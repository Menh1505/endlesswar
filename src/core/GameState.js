// ============================================================================
// GAME STATE - Quản lý trạng thái game
// ============================================================================

import { GAME } from '../config/constants.js';
import { WAVE_CONFIG, getWaveConfig } from '../config/waveConfig.js';
import { getRandomUpgrades } from '../config/upgradeConfig.js';

export class GameState {
    constructor() {
        this.isRunning = false;
        this.isGameOver = false;
        this.isPaused = false;
        this.score = 0;
        this.wave = 1;
        this.lastTime = 0;
        this.screenShake = 0;
        this.SCREEN_SHAKE_DURATION = GAME.SCREEN_SHAKE_DURATION;

        // Game mode
        this.gameMode = 'endless'; // 'endless' or 'campaign'
        this.currentLevel = 1;
        this.isLevelComplete = false;
        this.isVictory = false;

        // Wave system (Endless mode)
        this.waveState = 'playing'; // 'playing', 'break', 'complete'
        this.currentWaveConfig = null;
        this.enemiesToSpawn = 0;
        this.enemiesSpawned = 0;
        this.enemiesKilledThisWave = 0;
        this.breakTimer = 0;
        this.breakDuration = WAVE_CONFIG.BREAK_TIME;

        // Campaign mode
        this.totalEnemiesInLevel = 0;
        this.enemiesKilledInLevel = 0;

        // Upgrade system
        this.upgradeOptions = [];
        this.selectedUpgrade = null;
    }

    reset(mode = 'endless', level = 1) {
        this.isRunning = true;
        this.isGameOver = false;
        this.isPaused = false;
        this.isVictory = false;
        this.score = 0;
        this.screenShake = 0;
        this.gameMode = mode;

        if (mode === 'endless') {
            this.wave = 1;
            this.waveState = 'playing';
            this.currentWaveConfig = getWaveConfig(1);
            this.enemiesToSpawn = this.currentWaveConfig.total;
            this.enemiesSpawned = 0;
            this.enemiesKilledThisWave = 0;
            this.breakTimer = 0;
            this.upgradeOptions = [];
            this.selectedUpgrade = null;
        } else if (mode === 'campaign') {
            this.currentLevel = level;
            this.isLevelComplete = false;
            this.totalEnemiesInLevel = 0;
            this.enemiesKilledInLevel = 0;
        }
    }

    resetCampaignLevel(level) {
        this.isRunning = true;
        this.isGameOver = false;
        this.isLevelComplete = false;
        this.currentLevel = level;
        this.screenShake = 0;
        this.totalEnemiesInLevel = 0;
        this.enemiesKilledInLevel = 0;
    }

    startWave(waveNumber) {
        this.wave = waveNumber;
        this.waveState = 'playing';
        this.currentWaveConfig = getWaveConfig(waveNumber);
        this.enemiesToSpawn = this.currentWaveConfig.total;
        this.enemiesSpawned = 0;
        this.enemiesKilledThisWave = 0;
    }

    completeWave() {
        this.waveState = 'break';
        this.breakTimer = this.breakDuration;
        this.upgradeOptions = getRandomUpgrades(3);
        this.selectedUpgrade = null;
    }

    selectUpgrade(upgradeId) {
        this.selectedUpgrade = upgradeId;
    }
    checkCampaignLevelComplete() {
        if (this.gameMode === 'campaign' &&
            this.enemiesKilledInLevel >= this.totalEnemiesInLevel &&
            this.totalEnemiesInLevel > 0) {
            this.isLevelComplete = true;
            return true;
        }
        return false;
    }


    skipBreak() {
        this.breakTimer = 0;
    }

    updateBreakTimer(dt) {
        if (this.waveState === 'break' && this.breakTimer > 0) {
            this.breakTimer -= dt;
            if (this.breakTimer <= 0) {
                this.startWave(this.wave + 1);
            }
        }
    }

    isWaveComplete() {
        return this.enemiesSpawned >= this.enemiesToSpawn &&
            this.enemiesKilledThisWave >= this.enemiesToSpawn;
    }

    decreaseScreenShake() {
        if (this.screenShake > 0) {
            this.screenShake--;
        }
    }
}
