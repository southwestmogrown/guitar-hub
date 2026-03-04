const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Song } = require('../../db/models');
const upload = require('../../utils/upload');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const songs = await Song.findAll({ where: { userId: req.user.id } });
  return res.json({ songs });
}));

router.post('/', requireAuth, upload.single('songFile'), asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim().length === 0) {
    return res.status(422).json({ errors: ['Title is required.'] });
  }
  if (!req.file) {
    return res.status(422).json({ errors: ['Audio file is required.'] });
  }

  const song = await Song.create({
    title: title.trim(),
    userId: req.user.id,
    songUrl: `/media/songs/${req.file.filename}`,
  });

  return res.status(201).json({ song });
}));

module.exports = router;
