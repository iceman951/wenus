const io = require("socket.io")();
const event = require("./eventHandlers");
// const User = require("../../models/user");

io.on("connection", (socket) => {

  socket.on("sent-post", () => {
    socket.broadcast.emit("new-post");
  });
  
  socket.on("join-rooms", (rooms) => {
    socket.join(rooms);
  });

  socket.on("sent-comment", (post_id, user_id) => {
    event.createCommentNotification("comment", post_id, user_id)
    socket.to(post_id).emit("update-notifications");
  });

  socket.on("sent-like", (post_id) => {
    event.createLikeNotification("like", post_id)
    socket.to(post_id).emit("update-notifications");
  });

  socket.on("sent-delete-post", (post_id) => {
    socket.to(post_id).emit("update-notifications");
  });

});

const debugSocket = (socket, msg) => {
  socket.emit("debug", msg);
};

module.exports = io;
