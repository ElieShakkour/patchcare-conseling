const chattingHandler = (io) => {
console.log(23);
global.onlineUsers = new Map();
global.onlineUsersForVideo = new Map();


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.emit("me", socket.id);

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("add-user-toconference", (userId) => {
    console.log(userId);
    onlineUsersForVideo.set(userId, socket.id);
    console.log(onlineUsersForVideo);

  });


  socket.on("enter-conference", (userId) => {
    console.log("id",userId);
    onlineUsers.set(userId, socket.id);

  });
  socket.on("send-msg", (data) => {
    console.log("Online Users", onlineUsers);
    const sendUserSocket = onlineUsers.get(data.to);
    console.log(sendUserSocket, "qwe")
    if (sendUserSocket) {
      try {
        console.log(data.msg);
        socket.broadcast.to(sendUserSocket).emit("msg-receive", data.msg,data.from);
      
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log( onlineUsersForVideo.get(userToCall));
    console.log(from,"from")
    io.to( onlineUsersForVideo.get(userToCall)).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    console.log("call answered",onlineUsersForVideo.get(data.to));
    io.to(onlineUsersForVideo.get(data.to)).emit("callAccepted", data.signal)
  });

  
  
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
  onlineUsersForVideo.forEach((value, key) => {
    if (value === socket.id) {
      onlineUsers.delete(key);
    }
  });
});

  };
  
  module.exports = chattingHandler;
  