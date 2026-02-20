// ============================================================================
// ENEMY CLASS - Kẻ địch
// ============================================================================

import { ENEMY_TYPES } from '../config/enemyTypes.js';
import { isColliding } from '../utils/collision.js';
import { EnemyBullet } from './EnemyBullet.js';
import { findPath } from '../utils/pathfinding.js';

export class Enemy {
    constructor(x, y, wave, player, obstacles, gameState, enemyBullets, pathfindingGrid, type = 'grunt') {
        this.x = x;
        this.y = y;
        this.type = type;
        const config = ENEMY_TYPES[type];

        this.width = config.width;
        this.height = config.height;
        this.hp = config.baseHp + wave * config.hpPerWave;
        this.maxHp = this.hp;
        this.speed = config.baseSpeed + wave * config.speedPerWave;
        this.damage = config.damage;
        this.scoreValue = config.scoreValue;
        this.color = config.color;
        this.ai = config.ai || 'chase';
        this.isDead = false;
        this.hitFlash = 0;
        this.attackCooldown = 0;

        // AI-specific properties
        this.shootRange = config.shootRange || 0;
        this.keepDistance = config.keepDistance || 0;
        this.fireRate = config.fireRate || 0;
        this.bulletSpeed = config.bulletSpeed || 0;
        this.lastShot = 0;

        // Bomber-specific
        this.explosionRadius = config.explosionRadius || 0;
        this.fuseTime = config.fuseTime || 0;
        this.fuseTimer = 0;
        this.isExploding = false;

        // Pathfinding
        this.pathfindingGrid = pathfindingGrid;
        this.path = null;
        this.pathUpdateCounter = 0;
        this.currentPathIndex = 0;
        this.stuckCounter = 0;
        this.lastPosition = { x: this.x, y: this.y };

        // Dependencies
        this.player = player;
        this.obstacles = obstacles;
        this.gameState = gameState;
        this.enemyBullets = enemyBullets;
    }

    update(dt) {
        // Xử lý bomber explosion
        if (this.isExploding) {
            this.fuseTimer -= dt;
            if (this.fuseTimer <= 0) {
                this.explode();
                return;
            }
        }

        const dx = this.player.x + this.player.width / 2 - (this.x + this.width / 2);
        const dy = this.player.y + this.player.height / 2 - (this.y + this.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Lưu vị trí trước khi di chuyển
        const prevX = this.x;
        const prevY = this.y;

        // AI behavior dựa trên type
        switch (this.ai) {
            case 'chase':
                this.updateChaseAI(dx, dy, dist);
                break;
            case 'shooter':
                this.updateShooterAI(dx, dy, dist, dt);
                break;
            case 'bomber':
                this.updateBomberAI(dx, dy, dist);
                break;
            case 'boss':
                this.updateBossAI(dx, dy, dist, dt);
                break;
        }

        // Va chạm với obstacles - rollback position nếu xuyên vào
        for (const obs of this.obstacles) {
            if (isColliding(this, obs)) {
                // Rollback về vị trí cũ
                this.x = prevX;
                this.y = prevY;
                // Đánh dấu stuck để recalculate path
                this.stuckCounter += 3;
                break;
            }
        }

        // Va chạm với player (trừ shooter và bomber đang fuse)
        if (this.ai !== 'shooter' && !this.isExploding) {
            if (isColliding(this, this.player)) {
                if (this.attackCooldown <= 0) {
                    this.player.takeDamage(this.damage);
                    this.attackCooldown = 1000;
                }
            }
        }

        // Giảm cooldowns
        if (this.attackCooldown > 0) this.attackCooldown -= dt;
        if (this.hitFlash > 0) this.hitFlash -= dt;
    }

    updateChaseAI(dx, dy, dist) {
        // Smart pathfinding: tìm đường tránh vật cản
        this.pathUpdateCounter++;

        // Recalculate path every 20 frames or if stuck
        const distMoved = Math.sqrt(
            Math.pow(this.x - this.lastPosition.x, 2) +
            Math.pow(this.y - this.lastPosition.y, 2)
        );

        if (distMoved < 0.8) {
            this.stuckCounter++;
        } else {
            this.stuckCounter = 0;
        }

        if (this.pathUpdateCounter % 20 === 0 || this.stuckCounter > 5 || !this.path) {
            const playerCenterX = this.player.x + this.player.width / 2;
            const playerCenterY = this.player.y + this.player.height / 2;
            const enemyCenterX = this.x + this.width / 2;
            const enemyCenterY = this.y + this.height / 2;

            this.path = findPath(
                this.pathfindingGrid,
                enemyCenterX,
                enemyCenterY,
                playerCenterX,
                playerCenterY
            );
            this.currentPathIndex = 0;
            this.stuckCounter = 0;
        }

        this.lastPosition = { x: this.x, y: this.y };

        // Follow path if exists
        if (this.path && this.path.length > 0) {
            // Skip to next waypoint if close enough
            while (this.currentPathIndex < this.path.length) {
                const waypoint = this.path[this.currentPathIndex];
                const waypointDx = waypoint.x - (this.x + this.width / 2);
                const waypointDy = waypoint.y - (this.y + this.height / 2);
                const waypointDist = Math.sqrt(waypointDx * waypointDx + waypointDy * waypointDy);

                if (waypointDist < 12) {
                    this.currentPathIndex++;
                } else {
                    // Move towards this waypoint
                    this.x += (waypointDx / waypointDist) * this.speed;
                    this.y += (waypointDy / waypointDist) * this.speed;
                    break;
                }
            }
        } else {
            // Fallback: direct movement if no path found
            if (dist > 0) {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        }
    }

    updateShooterAI(dx, dy, dist, dt) {
        // Giữ khoảng cách và bắn
        if (dist < this.keepDistance) {
            // Quá gần -> lùi lại
            this.x -= (dx / dist) * this.speed;
            this.y -= (dy / dist) * this.speed;
        } else if (dist > this.shootRange) {
            // Quá xa -> tiến lại
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }

        // Bắn khi trong tầm
        if (dist <= this.shootRange) {
            const now = Date.now();
            if (now - this.lastShot >= this.fireRate) {
                this.shoot(dx, dy, dist);
                this.lastShot = now;
            }
        }
    }

    updateBomberAI(dx, dy, dist) {
        // Smart pathfinding cho bomber
        this.pathUpdateCounter++;

        const distMoved = Math.sqrt(
            Math.pow(this.x - this.lastPosition.x, 2) +
            Math.pow(this.y - this.lastPosition.y, 2)
        );

        if (distMoved < 0.8) {
            this.stuckCounter++;
        } else {
            this.stuckCounter = 0;
        }

        if (this.pathUpdateCounter % 20 === 0 || this.stuckCounter > 5 || !this.path) {
            const playerCenterX = this.player.x + this.player.width / 2;
            const playerCenterY = this.player.y + this.player.height / 2;
            const enemyCenterX = this.x + this.width / 2;
            const enemyCenterY = this.y + this.height / 2;

            this.path = findPath(
                this.pathfindingGrid,
                enemyCenterX,
                enemyCenterY,
                playerCenterX,
                playerCenterY
            );
            this.currentPathIndex = 0;
            this.stuckCounter = 0;
        }

        this.lastPosition = { x: this.x, y: this.y };

        // Follow path if exists
        if (this.path && this.path.length > 0) {
            while (this.currentPathIndex < this.path.length) {
                const waypoint = this.path[this.currentPathIndex];
                const waypointDx = waypoint.x - (this.x + this.width / 2);
                const waypointDy = waypoint.y - (this.y + this.height / 2);
                const waypointDist = Math.sqrt(waypointDx * waypointDx + waypointDy * waypointDy);

                if (waypointDist < 12) {
                    this.currentPathIndex++;
                } else {
                    this.x += (waypointDx / waypointDist) * this.speed;
                    this.y += (waypointDy / waypointDist) * this.speed;
                    break;
                }
            }
        } else {
            // Fallback: direct movement
            if (dist > 0) {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        }

        // Bắt đầu fuse khi gần player
        if (dist < this.explosionRadius && !this.isExploding) {
            this.isExploding = true;
            this.fuseTimer = this.fuseTime;
        }
    }

    updateBossAI(dx, dy, dist, dt) {
        // Boss: smart pathfinding + shooting
        this.pathUpdateCounter++;

        // Only move if far from player
        if (dist > 150) {
            const distMoved = Math.sqrt(
                Math.pow(this.x - this.lastPosition.x, 2) +
                Math.pow(this.y - this.lastPosition.y, 2)
            );

            if (distMoved < 0.8) {
                this.stuckCounter++;
            } else {
                this.stuckCounter = 0;
            }

            if (this.pathUpdateCounter % 20 === 0 || this.stuckCounter > 5 || !this.path) {
                const playerCenterX = this.player.x + this.player.width / 2;
                const playerCenterY = this.player.y + this.player.height / 2;
                const enemyCenterX = this.x + this.width / 2;
                const enemyCenterY = this.y + this.height / 2;

                this.path = findPath(
                    this.pathfindingGrid,
                    enemyCenterX,
                    enemyCenterY,
                    playerCenterX,
                    playerCenterY
                );
                this.currentPathIndex = 0;
                this.stuckCounter = 0;
            }

            this.lastPosition = { x: this.x, y: this.y };

            // Follow path
            if (this.path && this.path.length > 0) {
                while (this.currentPathIndex < this.path.length) {
                    const waypoint = this.path[this.currentPathIndex];
                    const waypointDx = waypoint.x - (this.x + this.width / 2);
                    const waypointDy = waypoint.y - (this.y + this.height / 2);
                    const waypointDist = Math.sqrt(waypointDx * waypointDx + waypointDy * waypointDy);

                    if (waypointDist < 12) {
                        this.currentPathIndex++;
                    } else {
                        this.x += (waypointDx / waypointDist) * this.speed;
                        this.y += (waypointDy / waypointDist) * this.speed;
                        break;
                    }
                }
            } else {
                // Fallback
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        }

        // Bắn liên tục
        const now = Date.now();
        if (now - this.lastShot >= this.fireRate) {
            this.shoot(dx, dy, dist);
            this.lastShot = now;
        }
    }

    shoot(dx, dy, dist) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        const bulletVx = (dx / dist) * this.bulletSpeed;
        const bulletVy = (dy / dist) * this.bulletSpeed;

        this.enemyBullets.push(new EnemyBullet(
            centerX,
            centerY,
            bulletVx,
            bulletVy,
            this.damage
        ));
    }

    explode() {
        // Gây damage AoE
        const dx = this.player.x + this.player.width / 2 - (this.x + this.width / 2);
        const dy = this.player.y + this.player.height / 2 - (this.y + this.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= this.explosionRadius) {
            this.player.takeDamage(this.damage);
            this.gameState.screenShake = 20;
        }

        this.isDead = true;

        // Track kills for both modes
        if (this.gameState.gameMode === 'campaign') {
            this.gameState.enemiesKilledInLevel++;
        } else {
            this.gameState.enemiesKilledThisWave++;
        }
    }

    takeDamage(damage) {
        this.hp -= damage;
        this.hitFlash = 200;

        if (this.hp <= 0) {
            this.isDead = true;
            this.gameState.score += this.scoreValue;

            // Track kills for both modes
            if (this.gameState.gameMode === 'campaign') {
                this.gameState.enemiesKilledInLevel++;
            } else {
                this.gameState.enemiesKilledThisWave++;
            }
        }
    }

    draw(ctx) {
        // Bomber fuse effect
        if (this.isExploding) {
            const pulse = Math.sin(Date.now() / 100) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(255, 0, 0, ${pulse})`;
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.explosionRadius,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        // Thay đổi màu khi bị hit
        if (this.hitFlash > 0) {
            ctx.fillStyle = '#FFF';
        } else {
            ctx.fillStyle = this.color;
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Icon chỉ loại enemy
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        let icon = '';
        switch (this.type) {
            case 'grunt': icon = '🪖'; break;
            case 'runner': icon = '🏃'; break;
            case 'tank': icon = '🛡'; break;
            case 'shooter': icon = '🔫'; break;
            case 'bomber': icon = '💣'; break;
            case 'boss': icon = '👑'; break;
        }

        if (icon) {
            ctx.fillText(icon, this.x + this.width / 2, this.y + this.height / 2 + 6);
        }

        // Vẽ label cho boss
        if (this.type === 'boss') {
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('BOSS', this.x + this.width / 2, this.y - 15);
        }

        ctx.textAlign = 'left';

        // Vẽ thanh máu nhỏ phía trên
        const hpBarWidth = this.width;
        const hpBarHeight = this.type === 'boss' ? 6 : 4;
        const hpPercent = this.hp / this.maxHp;

        ctx.fillStyle = '#000';
        ctx.fillRect(this.x, this.y - 8, hpBarWidth, hpBarHeight);
        ctx.fillStyle = '#0F0';
        ctx.fillRect(this.x, this.y - 8, hpBarWidth * hpPercent, hpBarHeight);
    }
}
