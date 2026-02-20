// ============================================================================
// CAMPAIGN LEVELS - Định nghĩa các màn chơi Campaign
// ============================================================================

export const CAMPAIGN_LEVELS = [
    // Level 1: Tutorial - Chỉ Grunt
    {
        id: 1,
        name: "First Contact",
        description: "Tiêu diệt 5 kẻ thù để hoàn thành màn đầu tiên",
        enemies: [
            { type: 'grunt', x: 600, y: 200 },
            { type: 'grunt', x: 300, y: 400 },
            { type: 'grunt', x: 900, y: 300 },
            { type: 'grunt', x: 700, y: 500 },
            { type: 'grunt', x: 400, y: 250 }
        ],
        obstacles: [
            { x: 200, y: 150, width: 80, height: 80 },
            { x: 920, y: 150, width: 80, height: 80 },
            { x: 200, y: 470, width: 80, height: 80 },
            { x: 920, y: 470, width: 80, height: 80 },
            { x: 560, y: 310, width: 100, height: 100 }
        ]
    },

    // Level 2: Speed Demons - Thêm Runner
    {
        id: 2,
        name: "Speed Demons",
        description: "Đối mặt với kẻ thù nhanh nhẹn",
        enemies: [
            { type: 'runner', x: 400, y: 150 },
            { type: 'runner', x: 800, y: 150 },
            { type: 'grunt', x: 300, y: 300 },
            { type: 'grunt', x: 900, y: 300 },
            { type: 'runner', x: 600, y: 500 },
            { type: 'grunt', x: 500, y: 450 },
            { type: 'grunt', x: 700, y: 450 }
        ],
        obstacles: [
            { x: 350, y: 200, width: 60, height: 60 },
            { x: 790, y: 200, width: 60, height: 60 },
            { x: 560, y: 310, width: 100, height: 100 },
            { x: 200, y: 400, width: 80, height: 120 },
            { x: 920, y: 400, width: 80, height: 120 }
        ]
    },

    // Level 3: Heavy Defense - Thêm Tank
    {
        id: 3,
        name: "Heavy Defense",
        description: "Phá vỡ hàng phòng thủ Tank",
        enemies: [
            { type: 'tank', x: 400, y: 200 },
            { type: 'tank', x: 800, y: 200 },
            { type: 'grunt', x: 300, y: 350 },
            { type: 'grunt', x: 900, y: 350 },
            { type: 'runner', x: 600, y: 500 },
            { type: 'runner', x: 400, y: 500 },
            { type: 'runner', x: 800, y: 500 },
            { type: 'tank', x: 600, y: 250 }
        ],
        obstacles: [
            { x: 200, y: 150, width: 80, height: 80 },
            { x: 920, y: 150, width: 80, height: 80 },
            { x: 500, y: 310, width: 80, height: 80 },
            { x: 620, y: 310, width: 80, height: 80 },
            { x: 350, y: 450, width: 60, height: 60 },
            { x: 790, y: 450, width: 60, height: 60 }
        ]
    },

    // Level 4: Sniper Nest - Thêm Shooter
    {
        id: 4,
        name: "Sniper Nest",
        description: "Né tránh đạn của Shooter và tiêu diệt chúng",
        enemies: [
            { type: 'shooter', x: 300, y: 150 },
            { type: 'shooter', x: 900, y: 150 },
            { type: 'grunt', x: 600, y: 200 },
            { type: 'tank', x: 450, y: 350 },
            { type: 'tank', x: 750, y: 350 },
            { type: 'shooter', x: 600, y: 500 },
            { type: 'runner', x: 400, y: 450 },
            { type: 'runner', x: 800, y: 450 }
        ],
        obstacles: [
            { x: 200, y: 250, width: 80, height: 100 },
            { x: 920, y: 250, width: 80, height: 100 },
            { x: 450, y: 200, width: 60, height: 60 },
            { x: 690, y: 200, width: 60, height: 60 },
            { x: 560, y: 310, width: 100, height: 100 },
            { x: 350, y: 500, width: 80, height: 80 },
            { x: 770, y: 500, width: 80, height: 80 }
        ]
    },

    // Level 5: Suicide Squad - Thêm Bomber
    {
        id: 5,
        name: "Suicide Squad",
        description: "Tránh xa Bomber trước khi chúng nổ tung!",
        enemies: [
            { type: 'bomber', x: 400, y: 150 },
            { type: 'bomber', x: 800, y: 150 },
            { type: 'grunt', x: 300, y: 300 },
            { type: 'grunt', x: 900, y: 300 },
            { type: 'shooter', x: 250, y: 450 },
            { type: 'shooter', x: 950, y: 450 },
            { type: 'tank', x: 600, y: 350 },
            { type: 'bomber', x: 600, y: 550 },
            { type: 'runner', x: 500, y: 250 },
            { type: 'runner', x: 700, y: 250 }
        ],
        obstacles: [
            { x: 200, y: 150, width: 80, height: 80 },
            { x: 920, y: 150, width: 80, height: 80 },
            { x: 200, y: 470, width: 80, height: 80 },
            { x: 920, y: 470, width: 80, height: 80 },
            { x: 460, y: 310, width: 80, height: 80 },
            { x: 660, y: 310, width: 80, height: 80 }
        ]
    },

    // Level 6: Boss Battle
    {
        id: 6,
        name: "First Boss",
        description: "Đánh bại Boss đầu tiên",
        enemies: [
            { type: 'boss', x: 600, y: 200 },
            { type: 'tank', x: 400, y: 350 },
            { type: 'tank', x: 800, y: 350 },
            { type: 'shooter', x: 300, y: 500 },
            { type: 'shooter', x: 900, y: 500 },
            { type: 'grunt', x: 500, y: 450 },
            { type: 'grunt', x: 700, y: 450 }
        ],
        obstacles: [
            { x: 200, y: 150, width: 80, height: 80 },
            { x: 920, y: 150, width: 80, height: 80 },
            { x: 200, y: 470, width: 80, height: 80 },
            { x: 920, y: 470, width: 80, height: 80 },
            { x: 560, y: 310, width: 100, height: 100 }
        ]
    },

    // Level 7: Mixed Assault
    {
        id: 7,
        name: "Mixed Assault",
        description: "Đối mặt với tất cả loại enemy",
        enemies: [
            { type: 'grunt', x: 300, y: 150 },
            { type: 'runner', x: 500, y: 150 },
            { type: 'tank', x: 700, y: 150 },
            { type: 'shooter', x: 900, y: 150 },
            { type: 'bomber', x: 600, y: 250 },
            { type: 'grunt', x: 250, y: 400 },
            { type: 'runner', x: 450, y: 400 },
            { type: 'tank', x: 650, y: 400 },
            { type: 'shooter', x: 850, y: 400 },
            { type: 'bomber', x: 350, y: 550 },
            { type: 'bomber', x: 750, y: 550 }
        ],
        obstacles: [
            { x: 350, y: 250, width: 60, height: 60 },
            { x: 790, y: 250, width: 60, height: 60 },
            { x: 500, y: 310, width: 80, height: 80 },
            { x: 620, y: 310, width: 80, height: 80 },
            { x: 200, y: 500, width: 100, height: 80 },
            { x: 900, y: 500, width: 100, height: 80 }
        ]
    },

    // Level 8: The Arena
    {
        id: 8,
        name: "The Arena",
        description: "Sinh tồn trong đấu trường chật hẹp",
        enemies: [
            { type: 'tank', x: 350, y: 150 },
            { type: 'tank', x: 850, y: 150 },
            { type: 'shooter', x: 350, y: 550 },
            { type: 'shooter', x: 850, y: 550 },
            { type: 'bomber', x: 600, y: 200 },
            { type: 'bomber', x: 600, y: 500 },
            { type: 'runner', x: 450, y: 350 },
            { type: 'runner', x: 750, y: 350 },
            { type: 'grunt', x: 500, y: 250 },
            { type: 'grunt', x: 700, y: 250 },
            { type: 'grunt', x: 500, y: 450 },
            { type: 'grunt', x: 700, y: 450 }
        ],
        obstacles: [
            { x: 350, y: 250, width: 80, height: 80 },
            { x: 770, y: 250, width: 80, height: 80 },
            { x: 350, y: 370, width: 80, height: 80 },
            { x: 770, y: 370, width: 80, height: 80 },
            { x: 560, y: 310, width: 100, height: 100 }
        ]
    },

    // Level 9: Double Trouble
    {
        id: 9,
        name: "Double Trouble",
        description: "Hai Boss cùng lúc - Thử thách cuối cùng!",
        enemies: [
            { type: 'boss', x: 400, y: 200 },
            { type: 'boss', x: 800, y: 200 },
            { type: 'tank', x: 300, y: 350 },
            { type: 'tank', x: 900, y: 350 },
            { type: 'shooter', x: 250, y: 500 },
            { type: 'shooter', x: 950, y: 500 },
            { type: 'bomber', x: 600, y: 250 },
            { type: 'runner', x: 500, y: 450 },
            { type: 'runner', x: 700, y: 450 }
        ],
        obstacles: [
            { x: 200, y: 150, width: 80, height: 80 },
            { x: 920, y: 150, width: 80, height: 80 },
            { x: 200, y: 470, width: 80, height: 80 },
            { x: 920, y: 470, width: 80, height: 80 },
            { x: 460, y: 310, width: 80, height: 80 },
            { x: 660, y: 310, width: 80, height: 80 }
        ]
    },

    // Level 10: Final Stand
    {
        id: 10,
        name: "Final Stand",
        description: "Màn cuối - Tiêu diệt tất cả để chiến thắng!",
        enemies: [
            { type: 'boss', x: 600, y: 150 },
            { type: 'tank', x: 350, y: 250 },
            { type: 'tank', x: 850, y: 250 },
            { type: 'shooter', x: 250, y: 350 },
            { type: 'shooter', x: 950, y: 350 },
            { type: 'bomber', x: 450, y: 200 },
            { type: 'bomber', x: 750, y: 200 },
            { type: 'bomber', x: 600, y: 500 },
            { type: 'runner', x: 300, y: 500 },
            { type: 'runner', x: 900, y: 500 },
            { type: 'grunt', x: 400, y: 400 },
            { type: 'grunt', x: 800, y: 400 },
            { type: 'grunt', x: 500, y: 550 },
            { type: 'grunt', x: 700, y: 550 }
        ],
        obstacles: [
            { x: 200, y: 200, width: 80, height: 80 },
            { x: 920, y: 200, width: 80, height: 80 },
            { x: 450, y: 310, width: 80, height: 80 },
            { x: 670, y: 310, width: 80, height: 80 },
            { x: 560, y: 450, width: 100, height: 60 },
            { x: 200, y: 450, width: 80, height: 100 },
            { x: 920, y: 450, width: 80, height: 100 }
        ]
    }
];

// Lấy level theo ID
export function getCampaignLevel(levelId) {
    return CAMPAIGN_LEVELS.find(level => level.id === levelId) || CAMPAIGN_LEVELS[0];
}

// Tổng số level
export const TOTAL_CAMPAIGN_LEVELS = CAMPAIGN_LEVELS.length;
