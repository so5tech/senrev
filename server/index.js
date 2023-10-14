const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  // console.log("333333333333333333333333333333")
  global.chatSocket = socket;
  // socket.on("add-user", (userId) => {
  //   // console.log("22222222222222222222222222")
  //   onlineUsers.set(userId, socket.id);
  //   console.log(onlineUsers);
  // });
  socket.on("add-user", (userId) => {
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, [socket.id]);
    } else {
      const socketIds = onlineUsers.get(userId);
      if (!socketIds.includes(socket.id)) {
        socketIds.push(socket.id);
        if (socketIds.length > 5) {
          socketIds.shift();
        }
      }
      
    }
    
    console.log(onlineUsers);
  });
  // socket.on("send-msg", (data) => {
  //   console.log(data);
  //   const sendUserSocket = onlineUsers.get(data.to);
  //   if (sendUserSocket) {
  //     socket.to(sendUserSocket).emit("msg-recieve", data.msg);
  //   }
  // });
  socket.on("send-msg", (data) => {
    console.log(data);
    const receiverSocketIds = onlineUsers.get(data.to);
    if (receiverSocketIds) {
      receiverSocketIds.forEach((receiverSocketId) => {
        socket.to(receiverSocketId).emit("msg-recieve", data.msg);
      });
    }
  });
});
