const io = require("socket.io")();
const event = require("./eventHandlers");

io.on("connection", (socket) => {
  socket.on("sent-post", () => {
    socket.broadcast.emit("new-post");
  });

  socket.on("join-rooms", (rooms) => {
    socket.join(rooms);
  });

  socket.on("sent-comment", (post_id, user_id) => {
    event.createCommentNotification("comment", post_id, user_id);
    socket.to(post_id).emit("update-notifications");
    socket.broadcast.emit("new-comment", post_id);
  });

  socket.on("sent-like", (post_id, user_id) => {
    event.createLikeNotification("like", post_id, user_id);
    socket.to(post_id).emit("update-notifications");
    socket.broadcast.emit("new-like", post_id);
  });

  socket.on("sent-delete-post", (post_id) => {
    socket.to(post_id).emit("update-notifications");
  });
});

module.exports = io;
