// ============================================================================
// ENEMY TYPES CONFIG - Cấu hình các loại enemy
// ============================================================================

export const ENEMY_TYPES = {
    // 🪖 Grunt - Lính thường
    grunt: {
        name: 'Grunt',
        width: 25,
        height: 25,
        baseHp: 50,
        hpPerWave: 10,
        baseSpeed: 1.5,
        speedPerWave: 0.1,
        damage: 10,
        scoreValue: 10,
        color: '#F44336',
        ai: 'chase' // Đuổi theo player
    },

    // 🏃 Runner - Nhanh, ít máu
    runner: {
        name: 'Runner',
        width: 20,
        height: 20,
        baseHp: 30,
        hpPerWave: 5,
        baseSpeed: 3.5,
        speedPerWave: 0.15,
        damage: 8,
        scoreValue: 15,
        color: '#FF9800',
        ai: 'chase'
    },

    // 🛡 Tank - Nhiều máu, chậm
    tank: {
        name: 'Tank',
        width: 35,
        height: 35,
        baseHp: 150,
        hpPerWave: 30,
        baseSpeed: 0.8,
        speedPerWave: 0.05,
        damage: 20,
        scoreValue: 30,
        color: '#4CAF50',
        ai: 'chase'
    },

    // 🔫 Shooter - Bắn đạn, giữ khoảng cách
    shooter: {
        name: 'Shooter',
        width: 22,
        height: 22,
        baseHp: 40,
        hpPerWave: 8,
        baseSpeed: 1.2,
        speedPerWave: 0.08,
        damage: 15,
        scoreValue: 25,
        color: '#2196F3',
        ai: 'shooter',
        shootRange: 300,      // Khoảng cách bắn
        keepDistance: 200,    // Khoảng cách giữ
        fireRate: 2000,       // 2 giây 1 phát
        bulletSpeed: 4
    },

    // 💣 Bomber - Lao tới và nổ
    bomber: {
        name: 'Bomber',
        width: 28,
        height: 28,
        baseHp: 60,
        hpPerWave: 12,
        baseSpeed: 2.0,
        speedPerWave: 0.12,
        damage: 40,           // Damage khi nổ
        scoreValue: 35,
        color: '#FF5722',
        ai: 'bomber',
        explosionRadius: 80,  // Bán kính nổ
        fuseTime: 1500        // Thời gian nổ khi gần player
    },

    // 👑 Boss - Mini boss mỗi 5 wave
    boss: {
        name: 'Boss',
        width: 60,
        height: 60,
        baseHp: 500,
        hpPerWave: 100,
        baseSpeed: 1.0,
        speedPerWave: 0.08,
        damage: 30,
        scoreValue: 100,
        color: '#9C27B0',
        ai: 'boss',
        shootRange: 400,
        fireRate: 1500,       // Boss bắn nhanh hơn
        bulletSpeed: 5
    },

    // 🔫🔫 Machinegunner - Hỏa lực cao, bắn burst
    machinegunner: {
        name: 'Machinegunner',
        width: 24,
        height: 24,
        baseHp: 50,
        hpPerWave: 10,
        baseSpeed: 1.0,
        speedPerWave: 0.06,
        damage: 8,
        scoreValue: 40,
        color: '#FF6B6B',
        ai: 'machinegunner',
        shootRange: 350,
        keepDistance: 220,
        fireRate: 3000,       // 3 giây 1 burst
        burstCount: 5,        // Bắn 5 viên mỗi burst
        burstDelay: 150,      // 150ms giữa mỗi viên trong burst
        bulletSpeed: 5
    },

    // 🎯 Sniper - Damage cao, tầm xa
    sniper: {
        name: 'Sniper',
        width: 20,
        height: 20,
        baseHp: 35,
        hpPerWave: 7,
        baseSpeed: 0.9,
        speedPerWave: 0.05,
        damage: 35,           // Damage cao
        scoreValue: 50,
        color: '#00BCD4',
        ai: 'sniper',
        shootRange: 500,      // Tầm bắn rất xa
        keepDistance: 350,    // Giữ khoảng cách xa
        fireRate: 4000,       // 4 giây 1 phát (chậm nhưng mạnh)
        bulletSpeed: 8        // Đạn rất nhanh
    },

    // 🔥 Flamethrower - Cone attack, damage liên tục
    flamethrower: {
        name: 'Flamethrower',
        width: 26,
        height: 26,
        baseHp: 70,
        hpPerWave: 14,
        baseSpeed: 1.1,
        speedPerWave: 0.07,
        damage: 6,            // Damage thấp mỗi viên nhưng nhiều viên
        scoreValue: 45,
        color: '#FF9100',
        ai: 'flamethrower',
        shootRange: 200,      // Tầm ngắn
        keepDistance: 120,
        fireRate: 2500,       // 2.5 giây
        spreadCount: 7,       // Bắn 7 viên spread
        spreadAngle: 40,      // 40 độ spread
        bulletSpeed: 3.5
    },

    // 💥 Artillery - AoE splash damage
    artillery: {
        name: 'Artillery',
        width: 30,
        height: 30,
        baseHp: 80,
        hpPerWave: 16,
        baseSpeed: 0.7,
        speedPerWave: 0.04,
        damage: 25,
        scoreValue: 60,
        color: '#795548',
        ai: 'artillery',
        shootRange: 450,
        keepDistance: 300,
        fireRate: 3500,       // 3.5 giây (chậm)
        splashRadius: 60,     // Bán kính splash
        bulletSpeed: 3        // Chậm như rocket
    },

    // 🎲 Spreader - Shotgun style
    spreader: {
        name: 'Spreader',
        width: 25,
        height: 25,
        baseHp: 60,
        hpPerWave: 12,
        baseSpeed: 1.3,
        speedPerWave: 0.08,
        damage: 10,
        scoreValue: 35,
        color: '#E91E63',
        ai: 'spreader',
        shootRange: 250,
        keepDistance: 180,
        fireRate: 2000,       // 2 giây
        spreadCount: 5,       // 5 viên
        spreadAngle: 25,      // 25 độ spread
        bulletSpeed: 4.5
    }
};

// Backwards compatibility
export const ENEMY_TYPES_COMPAT = {
    normal: 'grunt',
    fast: 'runner'
};
