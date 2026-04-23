let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://tecno-nextjs.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
      },
      allowEIO3: true // Support older clients if necessary
    });

    io.on("connection", (socket) => {
      console.log("🟢 Socket.io: New client connected ->", socket.id);
      
      socket.on("disconnect", (reason) => {
        console.log("🔴 Socket.io: Client disconnected ->", socket.id, "Reason:", reason);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  }
};
