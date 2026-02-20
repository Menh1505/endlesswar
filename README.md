# 🎮 Endless War - Top Down Shooter

A top-down shooter game that runs in the browser, built with **Vanilla JavaScript** and **Canvas 2D API**.

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. Open browser at the displayed address (usually `http://localhost:5173`)

## 🎯 Gameplay

### Controls
- **W/A/S/D** or **Arrow Keys**: Move player
- **Mouse**: Aim direction (player rotates to follow cursor)
- **Left Click** (or hold): Shoot
- **R**: Reload ammo (or Restart when game over)
- **1/2**: Switch weapons (Pistol/Rifle)

### Objectives
- Eliminate enemies to earn points
- Survive as long as possible
- Progressive waves → stronger enemies, faster spawning

### Weapons

#### 🔫 Pistol
- **Damage**: 20
- **Fire Rate**: Slow (400ms/shot)
- **Ammo**: Unlimited
- Suitable for early game or when Rifle is out of ammo

#### 🔫 Rifle
- **Damage**: 35
- **Fire Rate**: Fast (150ms/shot)
- **Magazine**: 30 rounds
- **Reload**: 2 seconds
- High damage but requires ammo management

### Enemy Types

The game features **4 enemy types** with unique characteristics:

#### 🔴 Normal Enemy
- Average HP and speed
- Deals 10 damage
- Red color
- Worth: 10 points

#### 🟠 Fast Enemy  
- Low HP but very fast
- Deals 8 damage
- Orange color
- Worth: 15 points

#### 🟢 Tank Enemy
- Very high HP but slow
- Deals 20 damage  
- Green color
- Worth: 30 points

#### 🟣 Boss Enemy
- Extremely high HP (500+)
- Double size
- Deals 30 damage
- Purple color with "BOSS" label
- Worth: 100 points
- **Appears every 5 waves** (wave 5, 10, 15...)

### Wave System - **NEW!** 🌊

Each wave now has a specific structure:
- **Count**: Each wave has a fixed number of enemies (not random)
- **Composition**: Different ratios of enemy types
- **Boss Waves**: A boss appears every 5 waves
- **Wave Break**: **10 seconds** rest after each wave to choose upgrades

#### Wave Progression:
- **Wave 1-5**: Tutorial (mostly Normal, few Fast)
- **Wave 6-10**: Increasing difficulty (Tank enemies added)
- **Wave 11+**: Hardcore (many Fast + Tank)

### Upgrade System - **NEW!** 🎁

After each wave, choose 1 of 3 random upgrades:

**HP Upgrades**:
- ❤️ Max HP +20 (and restore to full)
- 💚 Heal 50 HP

**Speed Upgrade**:
- ⚡ Move Speed +20%

**Weapon Upgrades**:
- 🔥 Fire Rate +20%
- 💥 Damage +25%
- 📦 Max Ammo +50%
- 🚀 Bullet Speed +30%

**How to choose**: Press **1, 2, 3** during break time or wait for auto-start

> 💡 **See details**: [WAVE_SYSTEM.md](WAVE_SYSTEM.md) - Complete guide to wave system

### Obstacles
- Gray boxes on the map
- Both player and enemies CANNOT pass through
- Use them for kiting enemies

## 🎨 Technical Features

### Technology
- ✅ **Vanilla JavaScript** (ES6+)
- ✅ **Canvas 2D API** - Everything drawn with basic shapes (rect, circle, line)
- ✅ **Vite** - Build tool & dev server
- ✅ **NO external libraries** for game logic

### Game Systems

#### 🔄 Game Loop
- Uses `requestAnimationFrame` (60 FPS)
- Delta time for frame-independent calculations

#### 💥 Collision System
- **AABB** (Axis-Aligned Bounding Box)
- Applied to:
  - Bullet ↔ Enemy
  - Enemy ↔ Player
  - Player/Enemy ↔ Obstacles

#### 🌊 Wave System - **NEW!**
- **Wave-based spawning**: Each wave has specific count and composition
- **4 Enemy types**: Normal, Fast, Tank, Boss
- **Boss waves**: A boss appears every 5 waves
- **Wave progression**: 15 pre-configured waves + scaling formula

#### 🎁 Upgrade System - **NEW!**
- **Break time**: 10 seconds rest after each wave
- **7 upgrade types**: HP, Speed, Fire Rate, Damage, Ammo, Bullet Speed
- **Random selection**: 3 random upgrades each wave
- **Strategic choices**: Choose upgrades that match your playstyle

#### 🎯 Effects
- **Screen shake**: When player is hit
- **Flash effect**: Enemy flashes when shot
- **Invincibility frames**: Player has 0.5s immunity after being hit

## 📦 Code Structure (Modular & Production-Ready)

```
src/
├── config/              # ⚙️ Configuration & constants
│   ├── constants.js     # Canvas size, player/enemy/bullet stats
│   └── weaponConfig.js  # Weapon configuration (damage, fire rate, ammo)
│
├── utils/               # 🛠️ Utility functions
│   ├── math.js          # Math functions (distance, normalize, randomRange)
│   └── collision.js     # AABB collision detection
│
├── entities/            # 👾 Game entities
│   ├── Player.js        # Player class (movement, shooting, reload)
│   ├── Enemy.js         # Enemy class (AI, HP, damage)
│   ├── Bullet.js        # Bullet class
│   └── Obstacle.js      # Obstacle class
│
├── core/                # 🎮 Core game systems
│   ├── GameState.js     # State management (score, wave, game over)
│   ├── InputManager.js  # Keyboard & mouse handling
│   ├── Renderer.js      # Screen and UI rendering (HUD, game over)
│   └── Game.js          # Main game logic (game loop, update, collision)
│
├── main.js              # 🚀 Entry point (game initialization)
└── style.css            # 🎨 CSS styling

```

> 💡 **See details**: [ARCHITECTURE.md](ARCHITECTURE.md) - Full explanation of structure and how to extend

## 🎮 HUD (Heads-Up Display)

Top left corner:
- **Score**: Total points
- **Wave**: Current wave
- **HP Bar**: Health bar (changes color by HP %)
- **Weapon**: Current weapon name
- **Ammo**: Remaining ammo/total ammo

Top right corner:
- Controls guide

## 🏆 Game Over

When HP = 0:
- Display "GAME OVER" screen
- Show final score & wave reached
- Press **R** to play again (reset entire state)

## 🔧 Customization & Extension

### Adjust Difficulty
In `src/config/constants.js`:
```javascript
export const GAME = {
  INITIAL_ENEMY_SPAWN_RATE: 2000,  // Spawn time (ms)
  MIN_SPAWN_RATE: 800,
  WAVE_SCORE_THRESHOLD: 20,  // Points needed to advance wave
};
```

### Add New Weapon
In `src/config/weaponConfig.js`:
```javascript
export const WEAPON_CONFIG = {
  pistol: { ... },
  rifle: { ... },
  shotgun: {
    name: 'Shotgun',
    damage: 50,
    fireRate: 800,
    bulletSpeed: 10,
    maxAmmo: 8,
    currentAmmo: 8,
    reloadTime: 1500
  }
};
```

## ✨ Code Quality

- ✅ **Modular Architecture**: Code divided into clear modules
- ✅ **Separation of Concerns**: Each file has specific responsibility
- ✅ **Easy to Maintain**: Modify a feature by editing just one file
- ✅ **Scalable**: Easy to add new entity/weapon/feature
- ✅ **Production Ready**: Industry-standard structure
- ✅ **Comments**: Code fully commented in Vietnamese

## 📝 Fully Commented Code

All code includes **Vietnamese comments** for easy understanding and modification:
- ✅ Explanation of each logic block
- ✅ Clear sections (Input, Update, Render, Collision)
- ✅ Comments for each important class and method

## 🎉 Have Fun!

Enjoy the game! If you find bugs or want to add features, feel free to edit directly in the source files. The code is well-organized for easy customization.
