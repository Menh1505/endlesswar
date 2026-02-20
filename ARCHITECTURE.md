# Endless War - Cấu trúc Code

## 📁 Cấu trúc thư mục

```
src/
├── config/              # Cấu hình và hằng số
│   ├── constants.js     # Các hằng số game (canvas size, player stats, enemy stats, etc.)
│   └── weaponConfig.js  # Cấu hình vũ khí (damage, fire rate, ammo, etc.)
│
├── utils/               # Các hàm tiện ích
│   ├── math.js          # Hàm toán học (distance, normalize, randomRange)
│   └── collision.js     # Hàm kiểm tra va chạm (isColliding)
│
├── entities/            # Các đối tượng game
│   ├── Player.js        # Class người chơi
│   ├── Enemy.js         # Class kẻ địch
│   ├── Bullet.js        # Class viên đạn
│   └── Obstacle.js      # Class chướng ngại vật
│
├── core/                # Core game systems
│   ├── GameState.js     # Quản lý trạng thái game (score, wave, game over, etc.)
│   ├── InputManager.js  # Quản lý input (keyboard, mouse)
│   ├── Renderer.js      # Vẽ màn hình và UI (HUD, game over screen)
│   └── Game.js          # Logic game chính (game loop, update, collision)
│
├── main.js              # Entry point chính
└── style.css            # CSS styles
```

## 🔧 Modules chi tiết

### Config
- **constants.js**: Chứa tất cả hằng số game như kích thước canvas, thông số player/enemy/bullet
- **weaponConfig.js**: Cấu hình chi tiết cho từng loại vũ khí

### Utils
- **math.js**: Các hàm toán học cơ bản (chuẩn hóa vector, tính khoảng cách, random)
- **collision.js**: Xử lý va chạm AABB

### Entities
Mỗi entity là một class độc lập với phương thức `update()` và `draw()`:
- **Player.js**: Xử lý di chuyển, bắn, reload, nhận damage
- **Enemy.js**: AI đơn giản đuổi theo player, nhận damage
- **Bullet.js**: Di chuyển thẳng, tự hủy khi ra khỏi màn hình
- **Obstacle.js**: Vật cản tĩnh

### Core
- **GameState.js**: Quản lý state toàn cục (điểm, wave, game over)
- **InputManager.js**: Tập trung hóa xử lý input
- **Renderer.js**: Tập trung hóa việc vẽ (grid, HUD, game over screen)
- **Game.js**: Class chính điều phối toàn bộ game (init, update, draw, game loop)

### Main
- **main.js**: Entry point đơn giản, khởi tạo Game và chạy

## 🎮 Quy trình hoạt động

1. **main.js** khởi tạo `Game`
2. **Game.js** setup:
   - Tạo `GameState`, `InputManager`, `Renderer`
   - Tạo các entities (Player, Enemies, Obstacles, Bullets)
   - Setup input handlers
3. **Game Loop**:
   - Update tất cả entities
   - Kiểm tra va chạm
   - Spawn enemies
   - Update wave progression
   - Render frame

## ✨ Ưu điểm của cấu trúc mới

1. **Separation of Concerns**: Mỗi module có trách nhiệm rõ ràng
2. **Dễ bảo trì**: Sửa một tính năng chỉ cần sửa một file
3. **Dễ mở rộng**: Thêm entity/weapon mới dễ dàng
4. **Dễ test**: Mỗi module có thể test độc lập
5. **Code reuse**: Utils có thể tái sử dụng
6. **Production ready**: Cấu trúc chuẩn công nghiệp

## 🚀 Cách thêm tính năng mới

### Thêm vũ khí mới
Sửa file `config/weaponConfig.js`

### Thêm loại enemy mới
Tạo class mới extend từ Enemy hoặc sửa `entities/Enemy.js`

### Thêm power-up
1. Tạo class mới trong `entities/PowerUp.js`
2. Thêm logic spawn trong `core/Game.js`
3. Thêm collision detection trong `core/Game.js`

### Thêm effect mới
Sửa `core/Renderer.js` để thêm visual effects
