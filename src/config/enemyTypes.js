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
    }
};

// Backwards compatibility
export const ENEMY_TYPES_COMPAT = {
    normal: 'grunt',
    fast: 'runner'
};
