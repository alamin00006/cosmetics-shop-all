import http from "http";
import mongoose from "mongoose";
import config from "./src/config/index.js";
import { app } from "./app.js";
import { Server as SocketServer } from "socket.io";

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  // console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://sharikana.com",
      "https://www.sharikana.com",
      "https://admin.sharikana.com",
      // "https://api.sharikana.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
  },
  transports: ["websocket", "polling"],
});

// Attach Socket.IO to the app
app.set("socketio", io);

io.on("connection", (socket) => {
  // console.log("Client connected via Socket.IO");

  // Allow each user to join a specific room based on their user ID
  socket.on("join_room", (room) => {
    socket.join(room);
    // console.log(`Client joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    // console.log("Client disconnected");
  });
});

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};

// Set Mongoose options
mongoose.set("strictQuery", false);

async function databaseConnect() {
  try {
    await mongoose.connect(config.database_url, options);
    console.log("🛢 Database connected successfully");

    server.listen(process.env.PORT || 5000, () => {
      console.log(`Application listening on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.error("Failed to connect to database", err);
  }

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (error) => {
    // console.error("Unhandled Rejection:", error.message);
    if (server) {
      server.close(() => process.exit(1));
    } else {
      process.exit(1);
    }
  });
}

databaseConnect();

// Graceful shutdown
process.on("SIGTERM", () => {
  // console.log("SIGTERM received. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      // console.log("Server closed.");
      process.exit(0);
    });
  }
});
