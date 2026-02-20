# 🌊 Wave System - Hệ Thống Sóng Chuyên Nghiệp

## ✨ Tính năng mới

### 1. 🎯 Enemy Types - Các loại kẻ địch

Game giờ có **4 loại enemy** với đặc điểm riêng biệt:

#### 🔴 Normal Enemy
- **HP**: Trung bình
- **Speed**: Trung bình  
- **Damage**: 10
- **Score**: 10 điểm
- Màu: Đỏ (#F44336)

#### 🟠 Fast Enemy
- **HP**: Thấp (30 base)
- **Speed**: Rất nhanh (3.5 base)
- **Damage**: 8
- **Score**: 15 điểm
- Màu: Cam (#FF9800)
- Khó bắn vì di chuyển nhanh!

#### 🟢 Tank Enemy
- **HP**: Cao (150 base)
- **Speed**: Chậm (0.8 base)
- **Damage**: 20
- **Score**: 30 điểm
- Màu: Xanh lá (#4CAF50)
- Cần nhiều đạn để tiêu diệt!

#### 🟣 Boss Enemy
- **HP**: Rất cao (500 base)
- **Speed**: Trung bình chậm
- **Damage**: 30
- **Score**: 100 điểm
- Màu: Tím (#9C27B0)
- Size lớn gấp đôi, có label "BOSS"
- Xuất hiện mỗi 5 wave!

### 2. 📊 Wave Configuration

Mỗi wave giờ có cấu trúc rõ ràng:
- **Total**: Số lượng enemy cụ thể
- **Composition**: Tỉ lệ từng loại enemy
- **Boss**: Có boss hay không (mỗi wave 5, 10, 15...)

#### Ví dụ Wave Config:
```javascript
// Wave 1: 5 enemies, 100% normal
{ total: 5, composition: { normal: 1.0 } }

// Wave 3: 10 enemies, 70% normal + 30% fast
{ total: 10, composition: { normal: 0.7, fast: 0.3 } }

// Wave 5: 15 enemies + 1 BOSS
{ total: 15, composition: { normal: 0.5, fast: 0.3, tank: 0.2 }, boss: true }
```

### 3. ⏸️ Wave Break - Thời gian nghỉ

Sau mỗi wave hoàn thành:
- **Break time**: 10 giây
- Hiển thị màn hình "Wave X Complete!"
- Đếm ngược thời gian
- Không có enemy, player an toàn

### 4. 🎁 Upgrade System - Hệ thống nâng cấp

Trong break time, chọn 1 trong 3 upgrades ngẫu nhiên:

#### Upgrades có sẵn:

**HP Upgrades**:
- ❤️ **Max HP +20**: Tăng máu tối đa và hồi đầy
- 💚 **Heal 50 HP**: Hồi máu ngay lập tức

**Speed Upgrades**:
- ⚡ **Move Speed +20%**: Di chuyển nhanh hơn

**Weapon Upgrades**:
- 🔥 **Fire Rate +20%**: Bắn nhanh hơn (giảm fire rate)
- 💥 **Damage +25%**: Tăng sát thương tất cả vũ khí
- 📦 **Max Ammo +50%**: Tăng băng đạn và nạp đầy
- 🚀 **Bullet Speed +30%**: Đạn bay nhanh hơn

#### Cách chọn upgrade:
1. Nhấn **1, 2, 3** để chọn upgrade tương ứng
2. Upgrade được apply ngay lập tức
3. Wave tiếp theo bắt đầu
4. Hoặc chờ hết 10 giây để auto-start (không upgrade)

### 5. 📈 Wave Progression

**Wave 1-5**: Làm quen
- Chủ yếu Normal enemies
- Dần thêm Fast
- Wave 5: Boss đầu tiên

**Wave 6-10**: Tăng độ khó
- Nhiều Fast và Tank hơn
- Wave 10: Boss thứ 2

**Wave 11+**: Hardcore
- Chủ yếu Fast + Tank
- Rất ít Normal
- Boss mỗi 5 wave

### 6. 🎮 HUD Updates

**New UI Elements**:
- **Wave Progress Bar**: Hiển thị tiến độ wave (Enemies killed/total)
- **Break Screen**: Màn hình upgrade selection với:
  - Wave complete message
  - Countdown timer
  - 3 upgrade cards với hover effect
  - Keyboard shortcuts (1, 2, 3)

## 🎯 Strategy Tips

### Early Game (Wave 1-5)
- Focus vào farming điểm
- Chọn Damage hoặc Fire Rate upgrades
- Học cách kite enemies

### Mid Game (Wave 6-10)
- Tank enemies xuất hiện nhiều hơn
- Cân nhắc Fire Rate và Bullet Speed
- HP upgrades quan trọng hơn

### Late Game (Wave 11+)
- Move Speed rất quan trọng để dodge
- Max Ammo giúp bắn liên tục
- Boss waves rất khó, cần full HP

## 🔧 Configuration Files

### `config/enemyTypes.js`
Định nghĩa stats cho từng loại enemy

### `config/waveConfig.js`
- Wave 1-15: Pre-configured
- Wave 16+: Scaling formula

### `config/upgradeConfig.js`
- Tất cả upgrades available
- Effect functions
- Random selection logic

## 🎨 Visual Features

- **Enemy Colors**: Mỗi loại có màu riêng
- **Boss Label**: "BOSS" text trên đầu
- **Boss HP Bar**: Thanh HP lớn hơn (6px thay vì 4px)
- **Upgrade Cards**: Hover effect, selected state
- **Wave Complete Animation**: Full-screen overlay

## 🚀 Chơi ngay!

```bash
npm run dev
```

Mở http://localhost:5173/ và trải nghiệm hệ thống wave mới!

---

**Thử thách**: Bạn có thể đến wave nào? 🏆
