# 🎮 Endless War - Top Down Shooter

Game bắn súng top-down chạy trên browser, được viết bằng **Vanilla JavaScript** và **Canvas 2D API**.

## 🚀 Cách chạy game

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Chạy development server**:
   ```bash
   npm run dev
   ```

3. Mở browser tại địa chỉ hiển thị (thường là `http://localhost:5173`)

## 🎯 Gameplay

### Điều khiển
- **W/A/S/D** hoặc **Mũi tên**: Di chuyển player
- **Chuột**: Xoay hướng bắn (player sẽ xoay theo con trỏ chuột)
- **Click chuột trái** (hoặc giữ): Bắn
- **R**: Reload đạn (hoặc Restart khi game over)
- **1/2**: Chuyển đổi vũ khí (Pistol/Rifle)

### Mục tiêu
- Tiêu diệt enemy để tăng điểm
- Sống sót càng lâu càng tốt
- Wave tăng dần → enemy mạnh hơn, spawn nhanh hơn

### Vũ khí

#### 🔫 Pistol
- **Sát thương**: 20
- **Tốc độ bắn**: Chậm (400ms/phát)
- **Đạn**: Vô hạn
- Thích hợp cho early game hoặc khi hết đạn Rifle

#### 🔫 Rifle
- **Sát thương**: 35
- **Tốc độ bắn**: Nhanh (150ms/phát)
- **Băng đạn**: 30 viên
- **Reload**: 2 giây
- Sát thương cao nhưng cần quản lý đạn

### Enemy Types

Game có **4 loại enemy** với đặc điểm riêng:

#### 🔴 Normal Enemy
- HP và tốc độ trung bình
- Gây 10 damage
- Màu đỏ
- Giá trị: 10 điểm

#### 🟠 Fast Enemy  
- HP thấp nhưng rất nhanh
- Gây 8 damage
- Màu cam
- Giá trị: 15 điểm

#### 🟢 Tank Enemy
- HP rất cao nhưng chậm
- Gây 20 damage  
- Màu xanh lá
- Giá trị: 30 điểm

#### 🟣 Boss Enemy
- HP cực cao (500+)
- Size gấp đôi
- Gây 30 damage
- Màu tím, có label "BOSS"
- Giá trị: 100 điểm
- **Xuất hiện mỗi 5 wave** (wave 5, 10, 15...)

### Wave System - **MỚI!** 🌊

Mỗi wave giờ có cấu trúc cụ thể:
- **Số lượng**: Mỗi wave có số enemy xác định (không random)
- **Composition**: Tỉ lệ từng loại enemy khác nhau
- **Boss Waves**: Mỗi 5 wave có 1 boss xuất hiện
- **Wave Break**: Sau mỗi wave nghỉ **10 giây** để chọn upgrade

#### Wave Progression:
- **Wave 1-5**: Làm quen (chủ yếu Normal, ít Fast)
- **Wave 6-10**: Tăng độ khó (thêm Tank)
- **Wave 11+**: Hardcore (nhiều Fast + Tank)

### Upgrade System - **MỚI!** 🎁

Sau mỗi wave, chọn 1 trong 3 upgrades ngẫu nhiên:

**HP Upgrades**:
- ❤️ Max HP +20 (và hồi đầy máu)
- 💚 Heal 50 HP

**Speed Upgrade**:
- ⚡ Move Speed +20%

**Weapon Upgrades**:
- 🔥 Fire Rate +20%
- 💥 Damage +25%
- 📦 Max Ammo +50%
- 🚀 Bullet Speed +30%

**Cách chọn**: Nhấn **1, 2, 3** trong break time hoặc chờ auto-start

> 💡 **Xem chi tiết**: [WAVE_SYSTEM.md](WAVE_SYSTEM.md) - Hướng dẫn đầy đủ về wave system

### Chướng ngại vật
- Các hộp màu xám trên map
- Player và enemy KHÔNG được đi xuyên qua
- Sử dụng để kiting enemy

## 🎨 Đặc điểm kỹ thuật

### Công nghệ
- ✅ **Vanilla JavaScript** (ES6+)
- ✅ **Canvas 2D API** - Vẽ toàn bộ bằng hình học cơ bản (rect, circle, line)
- ✅ **Vite** - Build tool & dev server
- ✅ **KHÔNG dùng thư viện ngoài** cho game logic

### Game Systems

#### 🔄 Game Loop
- Sử dụng `requestAnimationFrame` (60 FPS)
- Delta time để tính toán frame-independent

#### 💥 Collision System
- **AABB** (Axis-Aligned Bounding Box)
- Áp dụng cho:
  - Bullet ↔ Enemy
  - Enemy ↔ Player
  - Player/Enemy ↔ Obstacles

#### 🌊 Wave System - **MỚI!**
- **Wave-based spawning**: Mỗi wave có số lượng và composition cụ thể
- **4 Enemy types**: Normal, Fast, Tank, Boss
- **Boss waves**: Mỗi 5 wave xuất hiện 1 boss
- **Wave progression**: 15 pre-configured waves + scaling formula

#### 🎁 Upgrade System - **MỚI!**
- **Break time**: 10 giây nghỉ sau mỗi wave
- **7 upgrade types**: HP, Speed, Fire Rate, Damage, Ammo, Bullet Speed
- **Random selection**: 3 upgrades ngẫu nhiên mỗi wave
- **Strategic choices**: Chọn upgrade phù hợp với playstyle

#### 🎯 Effects
- **Screen shake**: Khi player bị hit
- **Flash effect**: Enemy nhấp nháy khi bị bắn
- **Invincibility frames**: Player có 0.5s miễn nhiễm sau khi bị hit

## 📦 Cấu trúc code (Modular & Production-Ready)

```
src/
├── config/              # ⚙️ Cấu hình & hằng số
│   ├── constants.js     # Canvas size, player/enemy/bullet stats
│   └── weaponConfig.js  # Cấu hình vũ khí (damage, fire rate, ammo)
│
├── utils/               # 🛠️ Các hàm tiện ích
│   ├── math.js          # Hàm toán học (distance, normalize, randomRange)
│   └── collision.js     # Kiểm tra va chạm AABB
│
├── entities/            # 👾 Các đối tượng game
│   ├── Player.js        # Class người chơi (movement, shooting, reload)
│   ├── Enemy.js         # Class kẻ địch (AI, HP, damage)
│   ├── Bullet.js        # Class viên đạn
│   └── Obstacle.js      # Class chướng ngại vật
│
├── core/                # 🎮 Core game systems
│   ├── GameState.js     # Quản lý trạng thái (score, wave, game over)
│   ├── InputManager.js  # Xử lý keyboard & mouse
│   ├── Renderer.js      # Vẽ màn hình và UI (HUD, game over)
│   └── Game.js          # Logic game chính (game loop, update, collision)
│
├── main.js              # 🚀 Entry point (khởi tạo game)
└── style.css            # 🎨 CSS styling

```

> 💡 **Xem chi tiết**: [ARCHITECTURE.md](ARCHITECTURE.md) - Giải thích đầy đủ về cấu trúc và cách mở rộng

## 🎮 HUD (Heads-Up Display)

Góc trên trái:
- **Score**: Tổng điểm
- **Wave**: Wave hiện tại
- **HP Bar**: Thanh máu (đổi màu theo % HP)
- **Weapon**: Tên vũ khí hiện tại
- **Ammo**: Số đạn còn lại/tổng đạn

Góc trên phải:
- Hướng dẫn điều khiển

## 🏆 Game Over

Khi HP = 0:
- Hiển thị màn hình "GAME OVER"
- Hiển thị điểm cuối cùng & wave đạt được
- Nhấn **R** để chơi lại (reset toàn bộ state)

## 🔧 Tùy chỉnh & mở rộng

### Điều chỉnh độ khó
Trong `src/config/constants.js`:
```javascript
export const GAME = {
  INITIAL_ENEMY_SPAWN_RATE: 2000,  // Thời gian spawn (ms)
  MIN_SPAWN_RATE: 800,
  WAVE_SCORE_THRESHOLD: 20,  // Điểm cần để lên wave
};
```

### Thêm vũ khí mới
Trong `src/config/weaponConfig.js`:
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
```Quality

- ✅ **Modular Architecture**: Code được chia thành các module rõ ràng
- ✅ **Separation of Concerns**: Mỗi file có trách nhiệm cụ thể
- ✅ **Easy to Maintain**: Sửa một tính năng chỉ cần sửa một file
- ✅ **Scalable**: Dễ dàng thêm entity/weapon/feature mới
- ✅ **Production Ready**: Cấu trúc chuẩn công nghiệp
- ✅ **Comments**: Code có comment bằng tiếng Việt đầy đủ
export const CANVAS_HEIGHT = 800;
```

## 📝 Code được comment đầy đủ

Toàn bộ code có comment bằng **tiếng Việt** để dễ hiểu và sửa đổi:
- ✅ Giải thích từng khối logic
- ✅ Các section rõ ràng (Input, Update, Render, Collision)
- ✅ Comment cho từng class và method quan trọng

## 🎉 Chúc vui vẻ!

Enjoy the game! Nếu có bug hoặc muốn thêm feature, hãy sửa trực tiếp trong `src/main.js`. Code đã được tổ chức rõ ràng để dễ dàng customize.
