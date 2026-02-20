// ============================================================================
// COLLISION UTILITIES - Hàm tiện ích va chạm
// ============================================================================

/**
 * Kiểm tra va chạm AABB (Axis-Aligned Bounding Box)
 */
export function isColliding(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}
