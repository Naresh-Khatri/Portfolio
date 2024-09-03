"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

export type Cursor = {
  id: string;
  x: number;
  y: number;
  name?: string;
  color?: string;
};
export type CursorsMap = Map<string, Cursor>;

type SocketContextType = {
  socket: Socket | null;
  remoteCursors: CursorsMap;
  setRemoteCursors: Dispatch<SetStateAction<CursorsMap>>;
};

const INITIAL_STATE: SocketContextType = {
  socket: null,
  remoteCursors: new Map(),
  setRemoteCursors: () => {},
};

export const SocketContext = createContext<SocketContextType>(INITIAL_STATE);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [remoteCursors, setRemoteCursors] = useState<CursorsMap>(new Map());
  // SETUP SOCKET.IO
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL!);
    setSocket(socket);
    socket.on("connect", () => {
      console.log(socket.id);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket: socket, remoteCursors, setRemoteCursors }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
