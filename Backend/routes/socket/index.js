const io = require("socket.io")();
const event = require("./eventHandlers");
// const User = require("../../models/user");

io.on("connection", (socket) => {
  socket.on("sent-post", () => {
    socket.broadcast.emit("new-post");
    console.log("new-post")
  });

  socket.on("join-rooms", (rooms) => {
    socket.join(rooms);
    debugSocket(socket, "socket.rooms");
  });

  socket.on("sent-comment", (post_id) => {
    event.createNotification("comment", post_id)
    socket.to(post_id).emit("new-comment");
  });

  socket.on("sent-like", (post_id) => {
    
  });

});

const debugSocket = (socket, msg) => {
  socket.emit("debug", msg);
};

module.exports = io;
