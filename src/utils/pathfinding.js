// ============================================================================
// PATHFINDING - Thuật toán A* tìm đường
// ============================================================================

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/constants.js';

const GRID_SIZE = 20; // Size of each grid cell for pathfinding (smaller = more accurate)
const GRID_COLS = Math.ceil(CANVAS_WIDTH / GRID_SIZE);
const GRID_ROWS = Math.ceil(CANVAS_HEIGHT / GRID_SIZE);

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0; // Cost from start
        this.h = 0; // Heuristic to goal
        this.f = 0; // Total cost
        this.parent = null;
        this.walkable = true;
    }
}

// Heuristic function (Manhattan distance)
function heuristic(node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}

// Get neighbors of a node with corner-cutting prevention
function getNeighbors(grid, node) {
    const neighbors = [];
    const x = node.x;
    const y = node.y;

    // 8 directions (including diagonals)
    const directions = [
        { dx: -1, dy: 0, diagonal: false },  // Left
        { dx: 1, dy: 0, diagonal: false },   // Right
        { dx: 0, dy: -1, diagonal: false },  // Up
        { dx: 0, dy: 1, diagonal: false },   // Down
        { dx: -1, dy: -1, diagonal: true, adj1: { dx: -1, dy: 0 }, adj2: { dx: 0, dy: -1 } }, // Top-left
        { dx: 1, dy: -1, diagonal: true, adj1: { dx: 1, dy: 0 }, adj2: { dx: 0, dy: -1 } },  // Top-right
        { dx: -1, dy: 1, diagonal: true, adj1: { dx: -1, dy: 0 }, adj2: { dx: 0, dy: 1 } },  // Bottom-left
        { dx: 1, dy: 1, diagonal: true, adj1: { dx: 1, dy: 0 }, adj2: { dx: 0, dy: 1 } }     // Bottom-right
    ];

    for (const dir of directions) {
        const newX = x + dir.dx;
        const newY = y + dir.dy;

        if (newX >= 0 && newX < GRID_COLS &&
            newY >= 0 && newY < GRID_ROWS) {
            const neighbor = grid[newY][newX];

            // Check if neighbor is walkable
            if (neighbor.walkable) {
                // For diagonal movement, check if we're cutting corners
                if (dir.diagonal) {
                    const adj1X = x + dir.adj1.dx;
                    const adj1Y = y + dir.adj1.dy;
                    const adj2X = x + dir.adj2.dx;
                    const adj2Y = y + dir.adj2.dy;

                    // Both adjacent cells must be walkable to move diagonally
                    if (adj1X >= 0 && adj1X < GRID_COLS && adj1Y >= 0 && adj1Y < GRID_ROWS &&
                        adj2X >= 0 && adj2X < GRID_COLS && adj2Y >= 0 && adj2Y < GRID_ROWS &&
                        grid[adj1Y][adj1X].walkable && grid[adj2Y][adj2X].walkable) {
                        neighbors.push(neighbor);
                    }
                } else {
                    neighbors.push(neighbor);
                }
            }
        }
    }

    return neighbors;
}

// Create grid from obstacles
export function createGrid(obstacles) {
    const grid = [];

    // Initialize grid
    for (let y = 0; y < GRID_ROWS; y++) {
        grid[y] = [];
        for (let x = 0; x < GRID_COLS; x++) {
            grid[y][x] = new Node(x, y);
        }
    }

    // Mark obstacle cells as unwalkable (no buffer, precise collision)
    for (const obs of obstacles) {
        const startX = Math.floor(obs.x / GRID_SIZE);
        const startY = Math.floor(obs.y / GRID_SIZE);
        const endX = Math.ceil((obs.x + obs.width) / GRID_SIZE);
        const endY = Math.ceil((obs.y + obs.height) / GRID_SIZE);

        for (let y = startY; y < endY && y < GRID_ROWS; y++) {
            for (let x = startX; x < endX && x < GRID_COLS; x++) {
                if (y >= 0 && x >= 0) {
                    grid[y][x].walkable = false;
                }
            }
        }
    }

    return grid;
}

// A* pathfinding algorithm
export function findPath(grid, startX, startY, goalX, goalY) {
    // Convert world coordinates to grid coordinates
    const startGridX = Math.floor(startX / GRID_SIZE);
    const startGridY = Math.floor(startY / GRID_SIZE);
    const goalGridX = Math.floor(goalX / GRID_SIZE);
    const goalGridY = Math.floor(goalY / GRID_SIZE);

    // Bounds check
    if (startGridX < 0 || startGridX >= GRID_COLS ||
        startGridY < 0 || startGridY >= GRID_ROWS ||
        goalGridX < 0 || goalGridX >= GRID_COLS ||
        goalGridY < 0 || goalGridY >= GRID_ROWS) {
        return null;
    }

    const startNode = grid[startGridY][startGridX];
    const goalNode = grid[goalGridY][goalGridX];

    // If start or goal is not walkable, return null
    if (!startNode.walkable || !goalNode.walkable) {
        return null;
    }

    const openList = [];
    const closedList = new Set();

    // Reset grid nodes
    for (let y = 0; y < GRID_ROWS; y++) {
        for (let x = 0; x < GRID_COLS; x++) {
            grid[y][x].g = 0;
            grid[y][x].h = 0;
            grid[y][x].f = 0;
            grid[y][x].parent = null;
        }
    }

    startNode.h = heuristic(startNode, goalNode);
    startNode.f = startNode.h;
    openList.push(startNode);

    let iterations = 0;
    const maxIterations = 500; // Prevent infinite loop

    while (openList.length > 0 && iterations < maxIterations) {
        iterations++;

        // Find node with lowest f cost
        let currentIndex = 0;
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < openList[currentIndex].f) {
                currentIndex = i;
            }
        }

        const current = openList[currentIndex];

        // Goal reached
        if (current === goalNode) {
            const path = [];
            let temp = current;
            while (temp) {
                path.push({
                    x: temp.x * GRID_SIZE + GRID_SIZE / 2,
                    y: temp.y * GRID_SIZE + GRID_SIZE / 2
                });
                temp = temp.parent;
            }
            return path.reverse();
        }

        // Move current from open to closed
        openList.splice(currentIndex, 1);
        closedList.add(current);

        // Check neighbors
        const neighbors = getNeighbors(grid, current);
        for (const neighbor of neighbors) {
            if (closedList.has(neighbor)) {
                continue;
            }

            // Calculate cost
            const isDiagonal = (neighbor.x !== current.x && neighbor.y !== current.y);
            const movementCost = isDiagonal ? 1.414 : 1; // Diagonal cost is sqrt(2)
            const gCost = current.g + movementCost;

            let isInOpen = openList.includes(neighbor);

            if (!isInOpen || gCost < neighbor.g) {
                neighbor.g = gCost;
                neighbor.h = heuristic(neighbor, goalNode);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;

                if (!isInOpen) {
                    openList.push(neighbor);
                }
            }
        }
    }

    // No path found
    return null;
}

// Simplified pathfinding for performance - only calculate when needed
export function getNextPathPoint(currentX, currentY, targetX, targetY, grid, currentPath, pathUpdateCounter) {
    // Recalculate path every 30 frames or if no path exists
    if (!currentPath || pathUpdateCounter % 30 === 0) {
        const newPath = findPath(grid, currentX, currentY, targetX, targetY);
        return { path: newPath, needsUpdate: true };
    }

    return { path: currentPath, needsUpdate: false };
}
