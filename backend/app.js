const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const AppError = require("./utlis/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const eventRouter = require("./routes/eventRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const inquiryRouter = require("./routes/inquiryRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const carouselRouter = require("./routes/carouselRoutes");

const app = express();

app.set("trust proxy", 1);

// ── BODY PARSER ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// ── CORS ─────────────────────────────────────────────────────────────────────
const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL,
  "https://tecno-instruments.vercel.app" // Explicitly added to be safe
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the whitelist or is a vercel preview branch
    if (whitelist.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options(/.*/, cors(corsOptions));

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "../public")));

// ── SECURITY HTTP HEADERS ─────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:8000", "ws://localhost:8000", "http://127.0.0.1:8000", "ws://127.0.0.1:8000", "https://tecno-nextjs.vercel.app"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:", "http://localhost:8000", "https://tecno-nextjs.vercel.app"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

// ── DEVELOPMENT LOGGING ───────────────────────────────────────────────────────
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
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
app.use(hpp({ whitelist: ["name", "isHidden", "category"] }));

// ── COMPRESSION ───────────────────────────────────────────────────────────────
app.use(compression());

// ── ROUTES ────────────────────────────────────────────────────────────────────
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/inquiries", inquiryRouter);
app.use("/api/v1/feedbacks", feedbackRouter);
app.use("/api/v1/carousels", carouselRouter);

// ── UNHANDLED ROUTES ──────────────────────────────────────────────────────────
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// ── GLOBAL ERROR HANDLER ──────────────────────────────────────────────────────
app.use(globalErrorHandler);

module.exports = app;
