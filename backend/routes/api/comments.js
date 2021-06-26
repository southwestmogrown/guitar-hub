const express = require('express');
const asyncHandler = require('express-async-handler');

const { Comment } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const comments = await Comment.findAll();

    return res.json({comments});
}));

router.post('/', restoreUser, asyncHandler(async(req, res) => {
   const { userId, trackId, songId, body } = req.body;
   const comment = await Comment.create({
       userId,
       trackId,
       songId,
       body
   });
   return res.json({comment})
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    const {id} = req.params;
    const comment = await Comment.destroy({
        where: {id}
    })
    return res.json({comment});
}));

router.patch('/:id', asyncHandler(async(req, res) => {
    const {id} = req.params;
    
    const comment = await Comment.update(req.body, {
        where: {id}
    })
    return res.json({comment});
}))

module.exports = router;