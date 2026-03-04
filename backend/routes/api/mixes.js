const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Mix } = require('../../db/models');
const upload = require('../../utils/upload');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const mixes = await Mix.findAll({ where: { userId: req.user.id } });
  return res.json({ mixes });
}));

router.post('/', requireAuth, upload.single('mixFile'), asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim().length === 0) {
    return res.status(422).json({ errors: ['Title is required.'] });
  }
  if (!req.file) {
    return res.status(422).json({ errors: ['Audio file is required.'] });
  }

  const mix = await Mix.create({
    title: title.trim(),
    userId: req.user.id,
    mixUrl: `/media/songs/${req.file.filename}`,
  });

  return res.status(201).json({ mix });
}));

module.exports = router;
