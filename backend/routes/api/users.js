const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true})
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true})
        .isLength({ min: 4})
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true})
        .isLength({ min: 6})
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

router.get('/', asyncHandler(async(req, res) => {
    const users = await User.findAll();
    return res.json({users})
}));

router.get('/:id(\\d+)', requireAuth, asyncHandler(async(req, res) => {
    const user = await User.findByPk(req.params.id);
    console.log(user)
    return res.json({user})
}))

router.post(
    '/',
    singleMulterUpload('image'),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const photoUrl = await singlePublicFileUpload(req.file);
        const user = await User.signup({
            username,
            email,
            password,
            photoUrl
        });

        setTokenCookie(res, user);

        return res.json({user});
    })
);



module.exports = router;