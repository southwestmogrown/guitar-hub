const express = require('express');
const path = require('path');
const router = express.Router();
const apiRouter = require('./api');

router.use('/media', express.static(path.resolve(__dirname, '../public/media')));

router.use('/api', apiRouter);


if (process.env.NODE_ENV === 'production') {
const path = require('path');
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    router.use(express.static(path.resolve("../frontend/build")));

    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}

if (process.env.NODE_ENV !== 'production') {
router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
});
}

module.exports = router;