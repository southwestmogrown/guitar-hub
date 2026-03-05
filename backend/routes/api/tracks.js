const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Track } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const tracks = await Track.findAll();
    return res.json({ tracks });
}));

router.patch('/:trackId', requireAuth, asyncHandler(async (req, res) => {
    const track = await Track.findOne({ where: { id: req.params.trackId, userId: req.user.id } });
    if (!track) return res.status(404).json({ error: 'Track not found.' });

    const { title } = req.body;
    if (!title || title.trim().length === 0) {
        return res.status(422).json({ errors: ['Title is required.'] });
    }

    await track.update({ title: title.trim() });
    return res.json({ track });
}));

router.delete('/:trackId', requireAuth, asyncHandler(async (req, res) => {
    const track = await Track.findOne({ where: { id: req.params.trackId, userId: req.user.id } });
    if (!track) return res.status(404).json({ error: 'Track not found.' });

    await track.destroy();
    return res.json({ deleted: true });
}));

module.exports = router;
