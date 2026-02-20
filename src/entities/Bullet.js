// ============================================================================
// BULLET CLASS - Viên đạn
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT, BULLET } from '../config/constants.js';

export class Bullet {
    constructor(x, y, vx, vy, damage) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = BULLET.WIDTH;
        this.height = BULLET.HEIGHT;
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
        ctx.fillStyle = '#FFC107';
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
