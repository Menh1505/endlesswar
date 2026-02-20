// ============================================================================
// ENEMY BULLET CLASS - Đạn của enemy
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/constants.js';

export class EnemyBullet {
    constructor(x, y, vx, vy, damage, splashRadius = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = 8;
        this.height = 8;
        this.damage = damage;
        this.isDead = false;
        this.splashRadius = splashRadius; // For artillery AoE
    }

    update(dt) {
        this.x += this.vx;
        this.y += this.vy;

        // Xóa khi ra ngoài màn hình
        if (this.x < -20 || this.x > CANVAS_WIDTH + 20 ||
            this.y < -20 || this.y > CANVAS_HEIGHT + 20) {
            this.isDead = true;
        }
    }

    draw(ctx) {
        // Artillery splash bullets look different
        if (this.splashRadius > 0) {
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect - larger for splash
            ctx.fillStyle = 'rgba(255, 165, 0, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width * 1.5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Normal bullets
            ctx.fillStyle = '#FF0000';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
