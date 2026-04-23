"use client";

import { useSocket as useSocketContext } from "@/components/providers/socket-provider";

export const useSocket = () => {
  return useSocketContext();
};
