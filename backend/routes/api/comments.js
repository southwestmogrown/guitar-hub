const express = require('express');
const asyncHandler = require('express-async-handler');

const { Comment } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const comments = await Comment.findAll();

    return res.json({comments});
}));

module.exports = router;