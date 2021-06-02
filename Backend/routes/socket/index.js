const io = require("socket.io")();
const event = require("./eventHandlers");
// const User = require("../../models/user");

io.on("connection", (socket) => {
  socket.on("sent-post", (user_id) => {
    socket.broadcast.emit("new-post", user_id);
  });

  socket.on("join-rooms", (rooms) => {
    socket.join(rooms);
    debugSocket(socket, "socket.rooms");
  });

  socket.on("notification", (post_id) => {
    debugSocket(socket, "notification start");
    try {
      const users = event.getUsersByPostId(post_id);
      // let users = User.find().select("password");

      if (!users) {
        socket.emit("debug", "no users");
      }
      console.log(users)
      // for (const user in users) {
      //   socket.emit("debug", user);
      // }

    } catch (error) {
      debugSocket(socket, `error ${error}`);
    }

    // try {

    //   // let notification = new Notification({
    //   //   type: "comment",
    //   //   user: user._id,
    //   //   post: post_id,
    //   // });
    //   // notification.save();

    //   socket.emit("debug", "err");
    // } catch (error) {
    //   debugSocket(socket, `error ${error}`);
    // }
    // socket.to(post_id).emit("new-comment");
    
    debugSocket(socket, "notification success");
  });
});

const debugSocket = (socket, msg) => {
  socket.emit("debug", msg);
};

module.exports = io;
