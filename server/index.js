// ============================================================================
// ENDLESS WAR - Backend API Server
// ============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const scoresRouter = require('./routes/scores');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', scoresRouter);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Endless War server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to Snowflake:', err.message);
    process.exit(1);
  });
