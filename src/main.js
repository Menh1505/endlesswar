// ============================================================================
// ENDLESS WAR - Main Entry Point
// ============================================================================

import './style.css';
import { Game } from './core/Game.js';
import { MenuManager } from './core/MenuManager.js';
import { submitScore, getLeaderboard } from './services/scoreService.js';

// Initialize menu and game
const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);
const menu = new MenuManager();

// Setup game callbacks
game.onGameEnd = async (isVictory, score, wave) => {
  const mode = game.gameState.gameMode;
  menu.showEndScreen(isVictory, score, wave, mode);

  // Only submit and show leaderboard for endless mode
  if (mode === 'endless') {
    await submitScore(score, wave, mode);
    const entries = await getLeaderboard(mode);
    menu.updateLeaderboard(entries);
  }
};

game.onLevelComplete = (level, score) => {
  menu.showLevelComplete(level, score);
};

game.onPause = (isPaused) => {
  if (isPaused) {
    menu.showPause();
  } else {
    menu.hidePause();
  }
};

// Setup menu callbacks
menu.onStartEndless = () => {
  game.startEndlessMode();
};

menu.onStartCampaign = (level) => {
  game.startCampaignMode(level);
};

menu.onRetry = () => {
  if (game.gameState.gameMode === 'endless') {
    game.startEndlessMode();
  } else {
    game.startCampaignMode(game.gameState.currentLevel);
  }
};

menu.onNextLevel = (level) => {
  game.startCampaignMode(level);
};

menu.onBackToMenu = () => {
  // Stop game loop if needed
  game.gameState.isRunning = false;
};

menu.onResume = () => {
  game.resumeGame();
};

menu.onPauseMenuBack = () => {
  game.gameState.isRunning = false;
  game.gameState.isPaused = false;
};

// Initialize game (starts the game loop)
game.init();

// Show home screen
menu.showHome();
