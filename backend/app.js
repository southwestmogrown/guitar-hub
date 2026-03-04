const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const asyncHandler = require('express-async-handler');

const { environment } = require('./config');
const routes = require('./routes');
const { Mix, StemJob, Stem } = require('./db/models');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if(!isProduction) {
    app.use(cors());
};

app.use(helmet({
    contentSecurityPolicy: false
}));

// Internal callback from Python service — must be BEFORE csurf
app.post('/internal/stems/callback', express.json(), asyncHandler(async (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip.includes('127.0.0.1') && !ip.includes('::1')) {
        return res.status(403).json({ error: 'Forbidden.' });
    }
    const { song_id, status, stems, error } = req.body;
    const stemJob = await StemJob.findOne({
        where: { mixId: song_id },
        order: [['createdAt', 'DESC']]
    });
    if (!stemJob) return res.status(404).json({ error: 'Job not found.' });

    if (status === 'complete') {
        await stemJob.update({ status: 'complete' });
        await Stem.bulkCreate(stems.map(stemType => ({
            mixId: song_id,
            stemJobId: stemJob.id,
            stemType,
            url: `/media/stems/${song_id}/${stemType}.mp3`
        })));
    } else {
        await stemJob.update({ status: 'failed', error: error || 'Unknown error.' });
    }
    return res.json({ received: true });
}));

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true,
        },
    })
);

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if(err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error'
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;