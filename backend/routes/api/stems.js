const express = require('express');
const asyncHandler = require('express-async-handler');
const path = require('path');
const axios = require('axios');
const { requireAuth } = require('../../utils/auth');
const { Song, StemJob, Stem, Track } = require('../../db/models');

const router = express.Router();

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://127.0.0.1:8001';
const NODE_BASE_URL = process.env.NODE_BASE_URL || 'http://127.0.0.1:8080';

// POST /api/stems/split/:songId — trigger stem separation
router.post('/split/:songId', requireAuth, asyncHandler(async (req, res) => {
  const song = await Song.findOne({
    where: { id: req.params.songId, userId: req.user.id }
  });
  if (!song) return res.status(404).json({ error: 'Song not found.' });

  // Check for existing pending/processing job
  const existing = await StemJob.findOne({
    where: { songId: song.id, status: ['pending', 'processing'] }
  });
  if (existing) return res.status(200).json({ stemJob: existing });

  const stemJob = await StemJob.create({ songId: song.id, status: 'pending' });

  const songPath = path.resolve(__dirname, '../../public', song.songUrl.slice(1));
  const callbackUrl = `${NODE_BASE_URL}/internal/stems/callback`;

  // Fire-and-forget
  stemJob.update({ status: 'processing' }).then(() => {
    axios.post(`${PYTHON_SERVICE_URL}/process`, {
      song_path: songPath,
      song_id: song.id,
      callback_url: callbackUrl
    }).catch(err => console.error('Python service error:', err.message));
  });

  return res.status(202).json({ stemJob });
}));

// GET /api/stems/job/:songId — poll job status
router.get('/job/:songId', requireAuth, asyncHandler(async (req, res) => {
  const song = await Song.findOne({
    where: { id: req.params.songId, userId: req.user.id }
  });
  if (!song) return res.status(404).json({ error: 'Song not found.' });

  const stemJob = await StemJob.findOne({
    where: { songId: song.id },
    order: [['createdAt', 'DESC']]
  });
  if (!stemJob) return res.status(404).json({ error: 'No stem job found.' });

  let stems = [];
  if (stemJob.status === 'complete') {
    stems = await Stem.findAll({ where: { stemJobId: stemJob.id } });
  }

  return res.json({ stemJob, stems });
}));

// POST /api/stems/publish — publish a stem as a Track
router.post('/publish', requireAuth, asyncHandler(async (req, res) => {
  const { stemId, title } = req.body;
  if (!stemId || !title || title.trim().length === 0) {
    return res.status(422).json({ errors: ['stemId and title are required.'] });
  }

  const stem = await Stem.findOne({
    where: { id: stemId },
    include: [{ model: Song, where: { userId: req.user.id } }]
  });
  if (!stem) return res.status(404).json({ error: 'Stem not found.' });

  const track = await Track.create({
    userId: req.user.id,
    title: title.trim(),
    url: stem.url
  });

  return res.status(201).json({ track });
}));

module.exports = router;
