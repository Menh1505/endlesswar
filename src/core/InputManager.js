// ============================================================================
// INPUT MANAGER - Quản lý input từ bàn phím và chuột
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/constants.js';

export class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            isDown: false
        };
    }

    setupInput(canvas, onReload, onWeaponSwitch, onUpgradeSelect, onPause) {
        // === KEYBOARD ===
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            // Pause game with ESC
            if (e.code === 'Escape' && onPause) {
                onPause();
                return;
            }

            // Manual reload
            if (e.code === 'KeyR') {
                onReload();
            }

            // Weapon switching
            if (e.code === 'Digit1') {
                onWeaponSwitch('pistol');
                // Also use for upgrade selection
                if (onUpgradeSelect) onUpgradeSelect(0);
            }
            if (e.code === 'Digit2') {
                onWeaponSwitch('rifle');
                // Also use for upgrade selection
                if (onUpgradeSelect) onUpgradeSelect(1);
            }
            if (e.code === 'Digit3') {
                // Upgrade selection
                if (onUpgradeSelect) onUpgradeSelect(2);
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // === MOUSE ===
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mousedown', (e) => {
            this.mouse.isDown = true;
        });

        canvas.addEventListener('mouseup', (e) => {
            this.mouse.isDown = false;
        });

        // Prevent context menu
        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
}
