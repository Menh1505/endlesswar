// ============================================================================
// PLAYER CLASS - Người chơi
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER } from '../config/constants.js';
import { WEAPON_CONFIG } from '../config/weaponConfig.js';
import { normalize } from '../utils/math.js';
import { isColliding } from '../utils/collision.js';
import { Bullet } from './Bullet.js';

export class Player {
    constructor(x, y, inputManager, gameState, bullets, obstacles) {
        this.x = x;
        this.y = y;
        this.width = PLAYER.WIDTH;
        this.height = PLAYER.HEIGHT;
        this.maxHp = PLAYER.MAX_HP;
        this.hp = this.maxHp;
        this.moveSpeed = PLAYER.MOVE_SPEED;
        this.currentWeapon = 'pistol';
        this.weapons = JSON.parse(JSON.stringify(WEAPON_CONFIG)); // Deep copy
        this.lastShot = 0;
        this.isReloading = false;
        this.reloadStartTime = 0;
        this.angle = 0; // Góc xoay theo chuột
        this.hitCooldown = 0; // Cooldown để tránh bị hit nhiều lần liên tục

        // Dependencies
        this.inputManager = inputManager;
        this.gameState = gameState;
        this.bullets = bullets;
        this.obstacles = obstacles;
    }

    update(dt) {
        // === INPUT - Di chuyển ===
        let vx = 0;
        let vy = 0;

        const keys = this.inputManager.keys;
        if (keys['KeyW'] || keys['ArrowUp']) vy -= 1;
        if (keys['KeyS'] || keys['ArrowDown']) vy += 1;
        if (keys['KeyA'] || keys['ArrowLeft']) vx -= 1;
        if (keys['KeyD'] || keys['ArrowRight']) vx += 1;

        // Chuẩn hóa vector di chuyển để tránh đi chéo nhanh hơn
        if (vx !== 0 || vy !== 0) {
            const normalized = normalize(vx, vy);
            vx = normalized.x * this.moveSpeed;
            vy = normalized.y * this.moveSpeed;
        }

        // Lưu vị trí cũ để kiểm tra va chạm
        const oldX = this.x;
        const oldY = this.y;

        // Di chuyển
        this.x += vx;
        this.y += vy;

        // === COLLISION - Va chạm với tường và obstacle ===
        // Va chạm biên map
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
        if (this.y + this.height > CANVAS_HEIGHT) this.y = CANVAS_HEIGHT - this.height;

        // Va chạm với obstacles
        for (const obs of this.obstacles) {
            if (isColliding(this, obs)) {
                // Đẩy player ra ngoài obstacle
                this.x = oldX;
                this.y = oldY;
                break;
            }
        }

        // === AIMING - Xoay theo chuột ===
        const mouse = this.inputManager.mouse;
        const dx = mouse.x - (this.x + this.width / 2);
        const dy = mouse.y - (this.y + this.height / 2);
        this.angle = Math.atan2(dy, dx);

        // === RELOAD ===
        if (this.isReloading) {
            const weapon = this.weapons[this.currentWeapon];
            if (Date.now() - this.reloadStartTime >= weapon.reloadTime) {
                weapon.currentAmmo = weapon.maxAmmo;
                this.isReloading = false;
            }
        }

        // === SHOOTING - Bắn ===
        const weapon = this.weapons[this.currentWeapon];
        if (mouse.isDown && !this.isReloading) {
            const now = Date.now();
            if (now - this.lastShot >= weapon.fireRate) {
                if (weapon.currentAmmo > 0 || weapon.maxAmmo === Infinity) {
                    this.shoot();
                    this.lastShot = now;
                    if (weapon.maxAmmo !== Infinity) {
                        weapon.currentAmmo--;
                    }
                }
            }
        }

        // Auto reload khi hết đạn
        if (weapon.currentAmmo === 0 && !this.isReloading && weapon.maxAmmo !== Infinity) {
            this.reload();
        }

        // Giảm hit cooldown
        if (this.hitCooldown > 0) this.hitCooldown -= dt;
    }

    shoot() {
        const weapon = this.weapons[this.currentWeapon];
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        // Tính vector hướng bắn
        const bulletVx = Math.cos(this.angle) * weapon.bulletSpeed;
        const bulletVy = Math.sin(this.angle) * weapon.bulletSpeed;

        this.bullets.push(new Bullet(centerX, centerY, bulletVx, bulletVy, weapon.damage));
    }

    reload() {
        if (this.isReloading) return;
        const weapon = this.weapons[this.currentWeapon];
        if (weapon.currentAmmo === weapon.maxAmmo) return;
        if (weapon.maxAmmo === Infinity) return;

        this.isReloading = true;
        this.reloadStartTime = Date.now();
    }

    switchWeapon(weaponType) {
        this.currentWeapon = weaponType;
        this.isReloading = false;
    }

    takeDamage(damage) {
        if (this.hitCooldown > 0) return; // Invincibility frames

        this.hp -= damage;
        this.hitCooldown = PLAYER.HIT_COOLDOWN;
        this.gameState.screenShake = this.gameState.SCREEN_SHAKE_DURATION;

        if (this.hp <= 0) {
            this.hp = 0;
            this.gameState.isGameOver = true;
            this.gameState.isRunning = false;
        }
    }

    draw(ctx) {
        ctx.save();

        // Nhấp nháy khi bị hit
        if (this.hitCooldown > 0 && Math.floor(this.hitCooldown / 100) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        // Vẽ thân (body) - hình vuông xanh
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Vẽ nòng súng - một đường thẳng chỉ hướng bắn
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const gunLength = PLAYER.GUN_LENGTH;
        const gunEndX = centerX + Math.cos(this.angle) * gunLength;
        const gunEndY = centerY + Math.sin(this.angle) * gunLength;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(gunEndX, gunEndY);
        ctx.stroke();

        ctx.restore();
    }
}
