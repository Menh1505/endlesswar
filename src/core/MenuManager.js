// ============================================================================
// MENU MANAGER - Quản lý UI và menu
// ============================================================================

import { TOTAL_CAMPAIGN_LEVELS } from '../config/campaignLevels.js';

export class MenuManager {
    constructor() {
        this.homeScreen = document.getElementById('homeScreen');
        this.gameCanvas = document.getElementById('gameCanvas');
        this.endScreen = document.getElementById('endScreen');
        this.levelCompleteScreen = document.getElementById('levelCompleteScreen');
        this.pauseScreen = document.getElementById('pauseScreen');

        // Buttons
        this.endlessModeBtn = document.getElementById('endlessModeBtn');
        this.campaignModeBtn = document.getElementById('campaignModeBtn');
        this.backToMenuBtn = document.getElementById('backToMenuBtn');
        this.retryBtn = document.getElementById('retryBtn');
        this.nextLevelBtn = document.getElementById('nextLevelBtn');
        this.levelMenuBtn = document.getElementById('levelMenuBtn');
        this.resumeBtn = document.getElementById('resumeBtn');
        this.pauseMenuBtn = document.getElementById('pauseMenuBtn');

        // Text elements
        this.endTitle = document.getElementById('endTitle');
        this.endMessage = document.getElementById('endMessage');
        this.finalScore = document.getElementById('finalScore');
        this.levelCompleteTitle = document.getElementById('levelCompleteTitle');
        this.levelStats = document.getElementById('levelStats');

        // State
        this.currentMode = null;
        this.currentLevel = 1;
        this.maxUnlockedLevel = 1;

        // Callbacks
        this.onStartEndless = null;
        this.onStartCampaign = null;
        this.onRetry = null;
        this.onNextLevel = null;
        this.onBackToMenu = null;
        this.onResume = null;
        this.onPauseMenuBack = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.endlessModeBtn) {
            this.endlessModeBtn.addEventListener('click', () => {
                if (this.onStartEndless) {
                    this.currentMode = 'endless';
                    this.showGame();
                    this.onStartEndless();
                }
            });
        }

        if (this.campaignModeBtn) {
            this.campaignModeBtn.addEventListener('click', () => {
                if (this.onStartCampaign) {
                    this.currentMode = 'campaign';
                    this.currentLevel = 1;
                    this.showGame();
                    this.onStartCampaign(this.currentLevel);
                }
            });
        }

        if (this.backToMenuBtn) {
            this.backToMenuBtn.addEventListener('click', () => {
                if (this.onBackToMenu) {
                    this.onBackToMenu();
                }
                this.showHome();
            });
        }

        if (this.retryBtn) {
            this.retryBtn.addEventListener('click', () => {
                if (this.onRetry) {
                    this.hideEndScreen();
                    this.showGame();
                    this.onRetry();
                }
            });
        }

        if (this.nextLevelBtn) {
            this.nextLevelBtn.addEventListener('click', () => {
                this.currentLevel++;
                if (this.currentLevel > this.maxUnlockedLevel) {
                    this.maxUnlockedLevel = this.currentLevel;
                }

                if (this.onNextLevel) {
                    this.hideLevelComplete();
                    this.showGame();
                    this.onNextLevel(this.currentLevel);
                }
            });
        }

        if (this.levelMenuBtn) {
            this.levelMenuBtn.addEventListener('click', () => {
                this.hideLevelComplete();
                this.showHome();
            });
        }

        if (this.resumeBtn) {
            this.resumeBtn.addEventListener('click', () => {
                this.hidePause();
                if (this.onResume) {
                    this.onResume();
                }
            });
        }

        if (this.pauseMenuBtn) {
            this.pauseMenuBtn.addEventListener('click', () => {
                this.hidePause();
                this.showHome();
                if (this.onPauseMenuBack) {
                    this.onPauseMenuBack();
                }
            });
        }
    }

    showHome() {
        if (this.homeScreen) this.homeScreen.style.display = 'flex';
        if (this.gameCanvas) this.gameCanvas.style.display = 'none';
        this.hideEndScreen();
        this.hideLevelComplete();
        this.hidePause();
    }

    showGame() {
        if (this.homeScreen) this.homeScreen.style.display = 'none';
        if (this.gameCanvas) this.gameCanvas.style.display = 'block';
        this.hideEndScreen();
        this.hideLevelComplete();
        this.hidePause();
    }

    showEndScreen(isVictory, score, wave, mode) {
        if (!this.endScreen) return;

        this.endScreen.style.display = 'flex';

        if (mode === 'endless') {
            if (isVictory) {
                this.endTitle.textContent = 'Victory!';
                this.endMessage.textContent = `You survived ${wave} waves!`;
            } else {
                this.endTitle.textContent = 'Game Over';
                this.endMessage.textContent = `You reached wave ${wave}`;
            }
            this.finalScore.textContent = `Final Score: ${score}`;
        } else {
            this.endTitle.textContent = 'Defeated';
            this.endMessage.textContent = 'Try again to complete the level';
            this.finalScore.textContent = '';
        }
    }

    hideEndScreen() {
        if (this.endScreen) {
            this.endScreen.style.display = 'none';
        }
    }

    showLevelComplete(level, score) {
        if (!this.levelCompleteScreen) return;

        this.levelCompleteScreen.style.display = 'flex';
        this.levelCompleteTitle.textContent = `Level ${level} Complete!`;
        this.levelStats.textContent = `Score: ${score}`;

        // Show or hide next level button based on remaining levels
        if (this.nextLevelBtn) {
            if (level >= TOTAL_CAMPAIGN_LEVELS) {
                this.nextLevelBtn.style.display = 'none';
                this.levelCompleteTitle.textContent = 'Campaign Complete!';
                this.levelStats.textContent = `Congratulations! Total Score: ${score}`;
            } else {
                this.nextLevelBtn.style.display = 'block';
            }
        }
    }

    hideLevelComplete() {
        if (this.levelCompleteScreen) {
            this.levelCompleteScreen.style.display = 'none';
        }
    }

    showPause() {
        if (this.pauseScreen) {
            this.pauseScreen.style.display = 'flex';
        }
    }

    hidePause() {
        if (this.pauseScreen) {
            this.pauseScreen.style.display = 'none';
        }
    }

    getCurrentMode() {
        return this.currentMode;
    }

    getCurrentLevel() {
        return this.currentLevel;
    }
}
