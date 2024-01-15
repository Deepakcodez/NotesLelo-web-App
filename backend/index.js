require("dotenv").config();
const express = require("express");
const app = express();
const socket = require("socket.io")
const cors = require("cors");
const cookieParser = require("cookie-parser");


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



// Routes
const user = require("./router/user.rout");
const group = require("./router/groups.rout");
const notes = require("./router/notes.rout");
const message = require("./router/message.rout");

app.use("/api/v1/user", user);
app.use("/api/v1/group", group);
app.use("/api/v1/notes", notes);
app.use("/api/v1/message", message);

const server = app.listen(port, () =>
  console.log(`NotesaLelo app listening on port ${port}!`)
);

// Socket code
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log('User connected:', socket.id);

  socket.on("add-user", (userId) => {
    console.log('User added:', userId);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    console.log('Message received:', data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("message-received", { message: data.message });
    }
  });
});
