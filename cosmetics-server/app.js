import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import httpStatus from "http-status";
// import helmet from "helmet";
import routes from "./src/app/routes/index.js";
import globalErrorHandler from "./src/middleware/globalErrorHandeller.js";
// import { rateLimit } from "express-rate-limit";

dotenv.config();

const app = express();
// Helmet
// app.use(
//   helmet.referrerPolicy({
//     policy: "strict-origin-when-cross-origin",
//     frameguard: { action: "sameorigin" },
//     hsts: {
//       maxAge: 31536000,
//       includeSubDomains: true,
//       preload: true,
//     },
//     noSniff: true,
//   })
// );

// // Limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
//   standardHeaders: "draft-8",
//   legacyHeaders: false,
// });

// app.use(limiter);

app.use(express.static("public"));

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://sharikana.com",
  "https://www.sharikana.com",
  "https://admin.sharikana.com",
  // "https://api.sharikana.com",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
  },
  transports: ["websocket", "polling"],
});

// Attach Socket.IO instance to the app for global use
app.set("socketio", io);

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes defined in /api/v1

app.get("/", (req, res) => {
  res.send("Bad Request!");
});

app.use("/api/v1", routes);

// Global error handler
app.use(globalErrorHandler);

// Handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export { app, server };
