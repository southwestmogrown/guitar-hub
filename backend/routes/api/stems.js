const express = require('express');
const asyncHandler = require('express-async-handler');
const path = require('path');
const axios = require('axios');
const { requireAuth } = require('../../utils/auth');
const { Mix, StemJob, Stem, Track } = require('../../db/models');

const router = express.Router();

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://127.0.0.1:8001';
const NODE_BASE_URL = process.env.NODE_BASE_URL || 'http://127.0.0.1:8080';

// POST /api/stems/split/:mixId — trigger stem separation
router.post('/split/:mixId', requireAuth, asyncHandler(async (req, res) => {
  const mix = await Mix.findOne({
    where: { id: req.params.mixId, userId: req.user.id }
  });
  if (!mix) return res.status(404).json({ error: 'Mix not found.' });

  const existing = await StemJob.findOne({
    where: { mixId: mix.id, status: ['pending', 'processing'] }
  });
  if (existing) return res.status(200).json({ stemJob: existing });

  const stemJob = await StemJob.create({ mixId: mix.id, status: 'pending' });

  const mixPath = path.resolve(__dirname, '../../public', mix.mixUrl.slice(1));
  const callbackUrl = `${NODE_BASE_URL}/internal/stems/callback`;

  stemJob.update({ status: 'processing' }).then(() => {
    axios.post(`${PYTHON_SERVICE_URL}/process`, {
      song_path: mixPath,
      song_id: mix.id,
      callback_url: callbackUrl
    }).catch(err => console.error('Python service error:', err.message));
  });

  return res.status(202).json({ stemJob });
}));

// GET /api/stems/job/:mixId — poll job status
router.get('/job/:mixId', requireAuth, asyncHandler(async (req, res) => {
  const mix = await Mix.findOne({
    where: { id: req.params.mixId, userId: req.user.id }
  });
  if (!mix) return res.status(404).json({ error: 'Mix not found.' });

  const stemJob = await StemJob.findOne({
    where: { mixId: mix.id },
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
    include: [{ model: Mix, where: { userId: req.user.id } }]
  });
  if (!stem) return res.status(404).json({ error: 'Stem not found.' });

  const track = await Track.create({
    userId: req.user.id,
    title: title.trim(),
    url: stem.url
  });

  return res.status(201).json({ track });
}));

// DELETE /api/stems/:stemId — delete a stem
router.delete('/:stemId', requireAuth, asyncHandler(async (req, res) => {
  const stem = await Stem.findOne({
    where: { id: req.params.stemId },
    include: [{ model: Mix, where: { userId: req.user.id } }]
  });
  if (!stem) return res.status(404).json({ error: 'Stem not found.' });

  await stem.destroy();
  return res.json({ deleted: true });
}));

module.exports = router;
