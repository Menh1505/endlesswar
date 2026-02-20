// ============================================================================
// WAVE CONFIG - Cấu hình wave system
// ============================================================================

export const WAVE_CONFIG = {
    // Thời gian break giữa các wave (ms)
    BREAK_TIME: 10000, // 10 giây

    // Mỗi wave có cấu trúc: { total, composition }
    waves: [
        // Wave 1-2: Chỉ grunt
        { total: 5, composition: { grunt: 1.0 } },
        { total: 8, composition: { grunt: 0.7, runner: 0.3 } },

        // Wave 3-4: Thêm shooter
        { total: 10, composition: { grunt: 0.5, runner: 0.3, shooter: 0.2 } },
        { total: 12, composition: { grunt: 0.4, runner: 0.3, tank: 0.2, shooter: 0.1 } },

        // Wave 5: Boss wave + machinegunner
        { total: 15, composition: { grunt: 0.3, runner: 0.2, tank: 0.2, shooter: 0.2, machinegunner: 0.1 }, boss: true },

        // Wave 6-7: Thêm spreader và bomber
        { total: 18, composition: { grunt: 0.25, runner: 0.2, tank: 0.2, shooter: 0.15, machinegunner: 0.1, spreader: 0.1 } },
        { total: 20, composition: { grunt: 0.2, runner: 0.2, tank: 0.15, shooter: 0.15, machinegunner: 0.1, spreader: 0.1, bomber: 0.1 } },

        // Wave 8-9: Thêm flamethrower
        { total: 22, composition: { grunt: 0.15, runner: 0.15, tank: 0.15, shooter: 0.15, machinegunner: 0.1, spreader: 0.1, flamethrower: 0.1, bomber: 0.1 } },
        { total: 25, composition: { grunt: 0.15, runner: 0.1, tank: 0.15, shooter: 0.15, machinegunner: 0.1, spreader: 0.1, flamethrower: 0.15, bomber: 0.1 } },

        // Wave 10: Boss wave + sniper
        { total: 30, composition: { grunt: 0.1, runner: 0.1, tank: 0.15, shooter: 0.15, machinegunner: 0.1, spreader: 0.1, flamethrower: 0.1, sniper: 0.1, bomber: 0.1 }, boss: true },

        // Wave 11-12: Thêm artillery
        { total: 35, composition: { grunt: 0.1, runner: 0.1, tank: 0.15, shooter: 0.1, machinegunner: 0.1, spreader: 0.1, flamethrower: 0.1, sniper: 0.1, artillery: 0.05, bomber: 0.1 } },
        { total: 40, composition: { grunt: 0.08, runner: 0.08, tank: 0.15, shooter: 0.1, machinegunner: 0.12, spreader: 0.1, flamethrower: 0.1, sniper: 0.12, artillery: 0.1, bomber: 0.05 } },

        // Wave 13-14: Tăng cường hỏa lực
        { total: 45, composition: { grunt: 0.05, runner: 0.05, tank: 0.15, shooter: 0.1, machinegunner: 0.15, spreader: 0.12, flamethrower: 0.12, sniper: 0.12, artillery: 0.1, bomber: 0.04 } },
        { total: 50, composition: { grunt: 0.05, runner: 0.05, tank: 0.15, shooter: 0.08, machinegunner: 0.15, spreader: 0.12, flamethrower: 0.13, sniper: 0.13, artillery: 0.12, bomber: 0.02 } },

        // Wave 15: Boss wave - Full arsenal
        { total: 60, composition: { grunt: 0.05, runner: 0.05, tank: 0.15, shooter: 0.1, machinegunner: 0.15, spreader: 0.12, flamethrower: 0.12, sniper: 0.12, artillery: 0.12, bomber: 0.02 }, boss: true },
    ],

    // Pattern cho wave > 15
    getScaledWave(waveNumber) {
        const isBossWave = waveNumber % 5 === 0;
        const baseTotal = 60 + (waveNumber - 15) * 5;

        return {
            total: baseTotal,
            composition: {
                grunt: 0.05,
                runner: 0.05,
                tank: 0.15,
                shooter: 0.08,
                machinegunner: 0.15,
                spreader: 0.12,
                flamethrower: 0.12,
                sniper: 0.12,
                artillery: 0.14,
                bomber: 0.02
            },
            boss: isBossWave
        };
    }
};

// Lấy config cho wave cụ thể
export function getWaveConfig(waveNumber) {
    if (waveNumber <= WAVE_CONFIG.waves.length) {
        return WAVE_CONFIG.waves[waveNumber - 1];
    }
    return WAVE_CONFIG.getScaledWave(waveNumber);
}
