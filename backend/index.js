require("dotenv").config();
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = http.createServer(app);

const port = 8000;
const db = require("./utils/db.connection");
db.connectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Map to store user IDs and their corresponding socket IDs
const usersSocketMap = {};

// Socket code
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected at id:", socket.id);

  socket.on("authenticate", (id) => {
    // Associate user ID with socket ID
    usersSocketMap[id] = socket.id;
    console.log(`User ${id} authenticated with socket ID ${socket.id}`);
  });

  socket.on("message", ({ message, id }) => {
    console.log('Received message:', message);
    const userSocketId = usersSocketMap[id];

    if (userSocketId) {
      // Emit the message to the specific user's socket
      io.to(userSocketId).emit("received-message", message);
    } else {
      console.log(`User ${id} not found`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove the user from the usersSocketMap when disconnected
    const disconnectedUserId = Object.keys(usersSocketMap).find(
      (userId) => usersSocketMap[userId] === socket.id
    );

    if (disconnectedUserId) {
      delete usersSocketMap[disconnectedUserId];
      console.log(`User ${disconnectedUserId} removed from usersSocketMap`);
    }
  });
});

// Routes
const user = require("./router/user.rout");
const group = require("./router/groups.rout");
const notes = require("./router/notes.rout");

app.use("/api/v1/user", user);
app.use("/api/v1/group", group);
app.use("/api/v1/notes", notes);

server.listen(port, () =>
  console.log(`NotesaLelo app listening on port ${port}!`)
);