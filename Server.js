require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initOurtubeServices } = require('./src/services'); // Use repo's existing service layer
const { processVideo, getVideoStatus } = require('./src/bot/functions'); // New bot logic

// Initialize core services (e.g., database, API clients)
initOurtubeServices(process.env);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(',') }));
app.use(express.json({ limit: '10mb' }));

// Bot Endpoints
app.post('/api/bot/process-video', async (req, res) => {
  try {
    const { videoUrl, userId, quality = '720p' } = req.body;
    const jobId = await processVideo(videoUrl, userId, quality);
    res.json({ success: true, jobId });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/bot/video-status/:jobId', async (req, res) => {
  try {
    const status = await getVideoStatus(req.params.jobId);
    res.json({ success: true, status });
  } catch (err) {
    res.status(404).json({ success: false, error: 'Job not found' });
  }
});

// Health Check for Hosting Platforms
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok', service: 'Ourtube Bot Server' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} | Environment: ${process.env.NODE_ENV}`);
});
