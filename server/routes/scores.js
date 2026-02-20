// ============================================================================
// SCORES ROUTES - /api/scores and /api/leaderboard
// ============================================================================

const express = require('express');
const router = express.Router();
const { query } = require('../db');

// POST /api/scores — submit a new score
router.post('/scores', async (req, res) => {
  const { device_id, score, wave, game_mode } = req.body;

  if (!device_id || score == null || wave == null || !game_mode) {
    return res.status(400).json({ error: 'Missing required fields: device_id, score, wave, game_mode' });
  }

  if (typeof score !== 'number' || typeof wave !== 'number') {
    return res.status(400).json({ error: 'score and wave must be numbers' });
  }

  try {
    await query(
      'INSERT INTO HIGH_SCORES (device_id, score, wave, game_mode) VALUES (?, ?, ?, ?)',
      [device_id, score, wave, game_mode]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error inserting score:', err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// GET /api/leaderboard?mode=endless — top 10 scores for a game mode
router.get('/leaderboard', async (req, res) => {
  const { mode } = req.query;

  if (!mode) {
    return res.status(400).json({ error: 'Query param "mode" is required' });
  }

  try {
    const rows = await query(
      'SELECT device_id, score, wave, game_mode FROM HIGH_SCORES WHERE game_mode = ? ORDER BY score DESC LIMIT 10',
      [mode]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
