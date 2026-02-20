// ============================================================================
// RENDERER - Vẽ màn hình và UI
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT, GAME } from '../config/constants.js';
import { UPGRADES } from '../config/upgradeConfig.js';

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.hoveredUpgrade = null;
    }

    clear() {
        this.ctx.fillStyle = '#2a2a2a';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawGrid() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;

        const gridSize = GAME.GRID_SIZE;
        for (let x = 0; x < CANVAS_WIDTH; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, CANVAS_HEIGHT);
            this.ctx.stroke();
        }
        for (let y = 0; y < CANVAS_HEIGHT; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(CANVAS_WIDTH, y);
            this.ctx.stroke();
        }
    }

    drawHUD(player, gameState) {
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '20px Arial';

        // Score
        this.ctx.fillText(`Score: ${gameState.score}`, 20, 30);

        // Wave
        this.ctx.fillText(`Wave: ${gameState.wave}`, 20, 60);

        // Player HP bar
        const hpBarX = 20;
        const hpBarY = 80;
        const hpBarWidth = 200;
        const hpBarHeight = 25;
        const hpPercent = player.hp / player.maxHp;

        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
        this.ctx.fillStyle = hpPercent > 0.5 ? '#4CAF50' : hpPercent > 0.25 ? '#FFC107' : '#F44336';
        this.ctx.fillRect(hpBarX, hpBarY, hpBarWidth * hpPercent, hpBarHeight);
        this.ctx.strokeStyle = '#FFF';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);

        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`HP: ${Math.ceil(player.hp)}/${player.maxHp}`, hpBarX + 5, hpBarY + 18);

        // Weapon & Ammo
        const weapon = player.weapons[player.currentWeapon];
        const ammoText = weapon.maxAmmo === Infinity
            ? '∞'
            : `${weapon.currentAmmo}/${weapon.maxAmmo}`;

        this.ctx.font = '18px Arial';
        this.ctx.fillText(`Weapon: ${weapon.name}`, 20, 130);
        this.ctx.fillText(`Ammo: ${ammoText}`, 20, 155);

        if (player.isReloading) {
            this.ctx.fillStyle = '#FF0';
            this.ctx.fillText('RELOADING...', 20, 180);
        }

        // Wave Progress
        if (gameState.waveState === 'playing') {
            const progress = gameState.enemiesKilledThisWave / gameState.enemiesToSpawn;
            const progressBarX = 20;
            const progressBarY = 190;
            const progressBarWidth = 200;
            const progressBarHeight = 15;

            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
            this.ctx.fillStyle = '#4CAF50';
            this.ctx.fillRect(progressBarX, progressBarY, progressBarWidth * progress, progressBarHeight);
            this.ctx.strokeStyle = '#FFF';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

            this.ctx.fillStyle = '#FFF';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`Enemies: ${gameState.enemiesKilledThisWave}/${gameState.enemiesToSpawn}`, progressBarX, progressBarY - 5);
        }

        // Instructions (right side)
        this.ctx.fillStyle = '#AAA';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText('WASD: Move', CANVAS_WIDTH - 20, 30);
        this.ctx.fillText('Mouse: Aim & Shoot', CANVAS_WIDTH - 20, 50);
        this.ctx.fillText('R: Reload', CANVAS_WIDTH - 20, 70);
        this.ctx.fillText('1/2: Switch Weapon', CANVAS_WIDTH - 20, 90);
        this.ctx.textAlign = 'left';
    }

    drawWaveBreak(gameState) {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Wave Complete text
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.font = 'bold 60px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Wave ${gameState.wave} Complete!`, CANVAS_WIDTH / 2, 100);

        // Timer
        const seconds = Math.ceil(gameState.breakTimer / 1000);
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Next wave in: ${seconds}s`, CANVAS_WIDTH / 2, 150);

        // Upgrade selection title
        this.ctx.fillStyle = '#FFC107';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.fillText('Choose an Upgrade', CANVAS_WIDTH / 2, 220);

        // Draw upgrade options
        const upgradeSpacing = 280;
        const startX = (CANVAS_WIDTH - upgradeSpacing * 2) / 2;
        const startY = 270;

        gameState.upgradeOptions.forEach((upgradeId, index) => {
            const upgrade = UPGRADES[upgradeId];
            const x = startX + index * upgradeSpacing;
            const y = startY;
            const width = 250;
            const height = 200;

            // Check if hovered
            const isHovered = this.hoveredUpgrade === index;
            const isSelected = gameState.selectedUpgrade === upgradeId;

            // Draw card background
            this.ctx.fillStyle = isSelected ? '#4CAF50' : (isHovered ? '#444' : '#333');
            this.ctx.fillRect(x, y, width, height);

            // Border
            this.ctx.strokeStyle = isSelected ? '#4CAF50' : (isHovered ? '#FFC107' : '#666');
            this.ctx.lineWidth = isSelected ? 4 : (isHovered ? 3 : 2);
            this.ctx.strokeRect(x, y, width, height);

            // Icon
            this.ctx.font = '48px Arial';
            this.ctx.fillStyle = '#FFF';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(upgrade.icon, x + width / 2, y + 70);

            // Name
            this.ctx.font = 'bold 20px Arial';
            this.ctx.fillStyle = '#FFF';
            this.ctx.fillText(upgrade.name, x + width / 2, y + 120);

            // Description
            this.ctx.font = '14px Arial';
            this.ctx.fillStyle = '#AAA';

            // Word wrap description
            const words = upgrade.description.split(' ');
            let line = '';
            let lineY = y + 150;
            const maxWidth = width - 20;

            for (let word of words) {
                const testLine = line + word + ' ';
                const metrics = this.ctx.measureText(testLine);
                if (metrics.width > maxWidth && line !== '') {
                    this.ctx.fillText(line, x + width / 2, lineY);
                    line = word + ' ';
                    lineY += 18;
                } else {
                    line = testLine;
                }
            }
            this.ctx.fillText(line, x + width / 2, lineY);

            // Number indicator
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillStyle = '#FFC107';
            this.ctx.fillText(`Press ${index + 1}`, x + width / 2, y + 190);
        });

        // Instructions
        this.ctx.fillStyle = '#AAA';
        this.ctx.font = '18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Press 1-3 to select upgrade, or wait for auto-start', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);

        this.ctx.textAlign = 'left';
    }

    drawGameOver(gameState) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.ctx.fillStyle = '#F44336';
        this.ctx.font = 'bold 72px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);

        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '32px Arial';
        this.ctx.fillText(`Final Score: ${gameState.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
        this.ctx.fillText(`Wave Reached: ${gameState.wave}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);

        this.ctx.fillStyle = '#FFC107';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press R to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 120);

        this.ctx.textAlign = 'left';
    }

    applyScreenShake(shakeAmount) {
        if (shakeAmount > 0) {
            this.ctx.save();
            this.ctx.translate(
                (Math.random() - 0.5) * shakeAmount,
                (Math.random() - 0.5) * shakeAmount
            );
            return true;
        }
        return false;
    }

    restoreScreenShake() {
        this.ctx.restore();
    }

    drawEntities(entities) {
        for (const entity of entities) {
            entity.draw(this.ctx);
        }
    }

    // Helper để tính vị trí upgrade card cho hover detection
    getUpgradeCardBounds(index) {
        const upgradeSpacing = 280;
        const startX = (CANVAS_WIDTH - upgradeSpacing * 2) / 2;
        const startY = 270;
        const x = startX + index * upgradeSpacing;
        const y = startY;
        const width = 250;
        const height = 200;

        return { x, y, width, height };
    }

    checkUpgradeHover(mouseX, mouseY, upgradeCount) {
        for (let i = 0; i < upgradeCount; i++) {
            const bounds = this.getUpgradeCardBounds(i);
            if (mouseX >= bounds.x && mouseX <= bounds.x + bounds.width &&
                mouseY >= bounds.y && mouseY <= bounds.y + bounds.height) {
                return i;
            }
        }
        return null;
    }

    drawCampaignInfo(levelData, enemiesRemaining, gameState) {
        // Draw level info at top center
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(CANVAS_WIDTH / 2 - 200, 10, 400, 80);

        this.ctx.fillStyle = '#FFF';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Level ${levelData.id}: ${levelData.name}`, CANVAS_WIDTH / 2, 35);

        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#CCC';
        this.ctx.fillText(levelData.description, CANVAS_WIDTH / 2, 60);

        // Enemies remaining counter
        const color = enemiesRemaining > 0 ? '#FF6B6B' : '#4CAF50';
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 18px Arial';
        this.ctx.fillText(`Enemies: ${enemiesRemaining}`, CANVAS_WIDTH / 2, 83);

        this.ctx.textAlign = 'left';
    }
}
