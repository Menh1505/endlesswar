// ============================================================================
// WEAPON CONFIGURATION - Cấu hình vũ khí
// ============================================================================

export const WEAPON_CONFIG = {
    pistol: {
        name: 'Pistol',
        damage: 20,
        fireRate: 400,      // ms giữa các phát bắn
        bulletSpeed: 12,
        maxAmmo: 20,
        currentAmmo: 20,
        reloadTime: 800
    },
    rifle: {
        name: 'Rifle',
        damage: 35,
        fireRate: 150,
        bulletSpeed: 15,
        maxAmmo: 30,
        currentAmmo: 30,
        reloadTime: 2000
    }
};
