const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const tracksRouter = require('./tracks.js');
const mixesRouter = require('./mixes.js');
const stemsRouter = require('./stems.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tracks', tracksRouter);
router.use('/mixes', mixesRouter);
router.use('/stems', stemsRouter);

module.exports = router;