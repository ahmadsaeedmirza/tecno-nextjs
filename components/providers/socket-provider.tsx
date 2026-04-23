"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";
import { API_BASE_URL } from "@/lib/api-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Standardize URL and ensure it has a protocol
    let socketUrl = API_BASE_URL;
    if (socketUrl && !socketUrl.startsWith('http')) {
      socketUrl = `http://${socketUrl}`;
    }

    // DEBUG: console.log for the user to see in their browser
    console.log("🔌 Attempting Socket.io connection to:", socketUrl);

    const socketInstance = ClientIO(socketUrl, {
      path: "/socket.io/",
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 20000,
    });

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected! ID:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
      setIsConnected(false);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("⚠️ Socket disconnected:", reason);
      setIsConnected(false);
      // If it was a manual disconnect, don't worry, otherwise it will try to reconnect
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
