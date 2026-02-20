// ============================================================================
// UPGRADE CONFIG - Cấu hình hệ thống nâng cấp
// ============================================================================

export const UPGRADES = {
    // HP Upgrades
    maxHp: {
        name: 'Max HP +20',
        description: 'Tăng máu tối đa và hồi đầy máu',
        icon: '❤️',
        effect: (player) => {
            player.maxHp += 20;
            player.hp = player.maxHp; // Full heal
        }
    },

    heal: {
        name: 'Heal 50 HP',
        description: 'Hồi 50 HP ngay lập tức',
        icon: '💚',
        effect: (player) => {
            player.hp = Math.min(player.hp + 50, player.maxHp);
        }
    },

    // Speed Upgrades
    moveSpeed: {
        name: 'Move Speed +20%',
        description: 'Tăng tốc độ di chuyển',
        icon: '⚡',
        effect: (player) => {
            player.moveSpeed *= 1.2;
        }
    },

    // Weapon Upgrades
    fireRate: {
        name: 'Fire Rate +20%',
        description: 'Bắn nhanh hơn 20%',
        icon: '🔥',
        effect: (player) => {
            Object.keys(player.weapons).forEach(key => {
                player.weapons[key].fireRate = Math.floor(player.weapons[key].fireRate * 0.8);
            });
        }
    },

    damage: {
        name: 'Damage +25%',
        description: 'Tăng sát thương tất cả vũ khí',
        icon: '💥',
        effect: (player) => {
            Object.keys(player.weapons).forEach(key => {
                player.weapons[key].damage = Math.floor(player.weapons[key].damage * 1.25);
            });
        }
    },

    ammo: {
        name: 'Max Ammo +50%',
        description: 'Tăng băng đạn và nạp đầy đạn',
        icon: '📦',
        effect: (player) => {
            Object.keys(player.weapons).forEach(key => {
                if (player.weapons[key].maxAmmo !== Infinity) {
                    player.weapons[key].maxAmmo = Math.floor(player.weapons[key].maxAmmo * 1.5);
                    player.weapons[key].currentAmmo = player.weapons[key].maxAmmo;
                }
            });
        }
    },

    bulletSpeed: {
        name: 'Bullet Speed +30%',
        description: 'Đạn bay nhanh hơn',
        icon: '🚀',
        effect: (player) => {
            Object.keys(player.weapons).forEach(key => {
                player.weapons[key].bulletSpeed = Math.floor(player.weapons[key].bulletSpeed * 1.3);
            });
        }
    }
};

// Lấy 3 upgrades ngẫu nhiên
export function getRandomUpgrades(count = 3) {
    const allUpgrades = Object.keys(UPGRADES);
    const selected = [];
    const available = [...allUpgrades];

    for (let i = 0; i < Math.min(count, available.length); i++) {
        const index = Math.floor(Math.random() * available.length);
        selected.push(available[index]);
        available.splice(index, 1);
    }

    return selected;
}
