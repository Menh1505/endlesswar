// ============================================================================
// MATH UTILITIES - Hàm tiện ích toán học
// ============================================================================

/**
 * Tính khoảng cách giữa 2 điểm
 */
export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Chuẩn hóa vector
 */
export function normalize(x, y) {
    const len = Math.sqrt(x * x + y * y);
    if (len === 0) return { x: 0, y: 0 };
    return { x: x / len, y: y / len };
}

/**
 * Random trong khoảng [min, max]
 */
export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
