// ============================================================================
// ENEMY BULLET CLASS - Đạn của enemy
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/constants.js';

export class EnemyBullet {
    constructor(x, y, vx, vy, damage) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = 8;
        this.height = 8;
        this.damage = damage;
        this.isDead = false;
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
