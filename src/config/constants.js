// ============================================================================
// GAME CONSTANTS - Các hằng số game
// ============================================================================

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;

export const PLAYER = {
    WIDTH: 30,
    HEIGHT: 30,
    MAX_HP: 100,
    MOVE_SPEED: 5,
    HIT_COOLDOWN: 500,
    GUN_LENGTH: 25
};

export const ENEMY = {
    WIDTH: 25,
    HEIGHT: 25,
    BASE_HP: 50,
    HP_PER_WAVE: 10,
    BASE_SPEED: 1.5,
    SPEED_PER_WAVE: 0.1,
    DAMAGE: 10,
    SCORE_VALUE: 10
};

export const BULLET = {
    WIDTH: 6,
    HEIGHT: 6
};

export const GAME = {
    INITIAL_ENEMY_SPAWN_RATE: 2000,
    MIN_SPAWN_RATE: 800,
    SPAWN_RATE_DECREASE: 100,
    WAVE_SCORE_THRESHOLD: 20,
    SCREEN_SHAKE_DURATION: 10,
    GRID_SIZE: 50
};
