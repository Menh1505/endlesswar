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

        // Wave 5: Boss wave
        { total: 15, composition: { grunt: 0.4, runner: 0.3, tank: 0.2, shooter: 0.1 }, boss: true },

        // Wave 6-7: Thêm bomber
        { total: 18, composition: { grunt: 0.3, runner: 0.3, tank: 0.2, shooter: 0.2 } },
        { total: 20, composition: { grunt: 0.3, runner: 0.2, tank: 0.2, shooter: 0.2, bomber: 0.1 } },

        // Wave 8-9: Tăng cường chiến thuật
        { total: 22, composition: { grunt: 0.2, runner: 0.2, tank: 0.2, shooter: 0.2, bomber: 0.2 } },
        { total: 25, composition: { grunt: 0.2, runner: 0.2, tank: 0.3, shooter: 0.2, bomber: 0.1 } },

        // Wave 10: Boss wave
        { total: 30, composition: { grunt: 0.2, runner: 0.2, tank: 0.3, shooter: 0.2, bomber: 0.1 }, boss: true },

        // Wave 11+: Đa dạng hoàn toàn
        { total: 35, composition: { grunt: 0.1, runner: 0.2, tank: 0.3, shooter: 0.2, bomber: 0.2 } },
        { total: 40, composition: { grunt: 0.1, runner: 0.2, tank: 0.3, shooter: 0.3, bomber: 0.1 } },
        { total: 45, composition: { grunt: 0.1, runner: 0.1, tank: 0.3, shooter: 0.3, bomber: 0.2 } },
        { total: 50, composition: { grunt: 0.1, runner: 0.1, tank: 0.4, shooter: 0.3, bomber: 0.1 } },

        // Wave 15: Boss wave
        { total: 60, composition: { grunt: 0.1, runner: 0.1, tank: 0.4, shooter: 0.3, bomber: 0.1 }, boss: true },
    ],

    // Pattern cho wave > 15
    getScaledWave(waveNumber) {
        const isBossWave = waveNumber % 5 === 0;
        const baseTotal = 60 + (waveNumber - 15) * 5;

        return {
            total: baseTotal,
            composition: {
                grunt: 0.1,
                runner: 0.1,
                tank: 0.3,
                shooter: 0.3,
                bomber: 0.2
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
