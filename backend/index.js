const express = require('express');
const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/message', async (req, res) => {
  // If DB not configured, return simple message
  const dbHost = process.env.DB_HOST;
  if (!dbHost) return res.json({ message: 'hello from backend (no db configured)' });

  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432
  });

  try {
    await client.connect();
    const r = await client.query('SELECT NOW() as now');
    await client.end();
    res.json({ message: 'hello from backend', now: r.rows[0].now });
  } catch (e) {
    console.error('db error', e.message);
    res.status(500).json({ error: 'db error', detail: e.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on ${PORT}`);
});
