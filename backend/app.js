const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const AppError = require('./utlis/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const eventRouter = require('./routes/eventRoutes');
const catagoryRouter = require('./routes/catagoryRoutes');
const inquiryRouter = require('./routes/inquiryRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');

const app = express();

app.set('trust proxy', 1);

// ── BODY PARSER ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// ── CORS ─────────────────────────────────────────────────────────────────────
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
};
app.use(cors(corsOptions));
app.options('/{*path}', cors(corsOptions));

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// ── SECURITY HTTP HEADERS ─────────────────────────────────────────────────────
app.use(helmet());

// ── DEVELOPMENT LOGGING ───────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// ── RATE LIMITING ─────────────────────────────────────────────────────────────
// const limiter = rateLimit({
//     windowMs: 60 * 60 * 1000, // 1 hour window
//     max: 100,
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// ── DATA SANITIZATION ─────────────────────────────────────────────────────────
// express-mongo-sanitize is incompatible with Express 5 (req.query is read-only).
// Re-enable once a compatible version is released.
// app.use(mongoSanitize({ replaceWith: '_' }));
// app.use(xss());           // against XSS attacks

// ── PREVENT PARAMETER POLLUTION ───────────────────────────────────────────────
app.use(hpp({ whitelist: ['name', 'isHidden', 'catagory'] }));

// ── COMPRESSION ───────────────────────────────────────────────────────────────
app.use(compression());

// ── ROUTES ────────────────────────────────────────────────────────────────────
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/catagories', catagoryRouter);
app.use('/api/v1/inquiries', inquiryRouter);
app.use('/api/v1/feedbacks', feedbackRouter);

// ── UNHANDLED ROUTES ──────────────────────────────────────────────────────────
app.all('/{*path}', (req, res) => {
    new AppError(`Can't find ${req.originalUrl} on this server`, 404);
});

// ── GLOBAL ERROR HANDLER ──────────────────────────────────────────────────────
app.use(globalErrorHandler);

module.exports = app;