// ============================================================================
// SCORE SERVICE - Leaderboard API calls
// ============================================================================

import { getDeviceId } from '../utils/deviceId.js';

export async function submitScore(score, wave, gameMode) {
  try {
    await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: getDeviceId(),
        score,
        wave,
        game_mode: gameMode,
      }),
    });
  } catch (err) {
    console.error('Failed to submit score:', err);
  }
}

export async function getLeaderboard(gameMode) {
  try {
    const res = await fetch(`/api/leaderboard?mode=${gameMode}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch leaderboard:', err);
    return [];
  }
}
