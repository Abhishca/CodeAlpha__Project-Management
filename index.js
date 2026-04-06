let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("joinProject", (projectId) => {
        socket.join(projectId);
      });

      socket.on("sendComment", (data) => {
        io.to(data.projectId).emit("receiveComment", data);
      });

      socket.on("taskUpdated", (data) => {
        io.to(data.projectId).emit("taskUpdated", data);
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
  },
};