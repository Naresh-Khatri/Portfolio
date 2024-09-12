"use client";
import { SocketContext, User, UserMap } from "@/contexts/socketio";
import { useMouse } from "@/hooks/use-mouse";
import { useThrottle } from "@/hooks/use-throttle";
import { MousePointer2 } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

// TODO: add clicking animation
// TODO: listen to socket disconnect
const RemoteCursors = () => {
  const { socket, users: _users, setUsers } = useContext(SocketContext);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { x, y } = useMouse({ allowPage: true });
  useEffect(() => {
    if (typeof window === "undefined" || !socket || isMobile) return;
    socket.on("cursor-changed", (data) => {
      setUsers((prev: UserMap) => {
        const newMap = new Map(prev);
        if (!prev.has(data.socketId)) {
          newMap.set(data.socketId, {
            ...data,
          });
        } else {
          newMap.set(data.socketId, { ...prev.get(data.socketId), ...data });
        }
        return newMap;
      });
    });
    socket.on("users-updated", (data: User[]) => {
      const newMap = new Map();
      data.forEach((user) => {
        newMap.set(user.socketId, { ...user });
      });
      setUsers(newMap);
    });
    return () => {
      socket.off("cursor-changed");
    };
  }, [socket, isMobile]);
  const handleMouseMove = useThrottle((x, y) => {
    socket?.emit("cursor-change", {
      pos: { x, y },
      socketId: socket.id,
    });
  }, 200);
  useEffect(() => {
    if (isMobile) return;
    handleMouseMove(x, y);
  }, [x, y, isMobile]);
  const users = Array.from(_users.values());
  return (
    <div className="h-0 z-10 relative">
      {users
        .filter((user) => user.socketId !== socket?.id)
        .map((user) => (
          <Cursor
            key={user.socketId}
            x={user.pos.x}
            y={user.pos.y}
            color={user.color}
            socketId={user.socketId}
            headerText={`${user.location} ${user.flag}`}
          />
        ))}
    </div>
  );
};

const Cursor = ({
  color,
  x,
  y,
  headerText,
  socketId,
}: {
  x: number;
  y: number;
  color?: string;
  headerText: string;
  socketId: string;
}) => {
  const [showText, setShowText] = useState(false);
  const [msgText, setMsgText] = useState("");
  const { msgs } = useContext(SocketContext);

  useEffect(() => {
    setShowText(true);
    const fadeOutTimeout = setTimeout(() => {
      setShowText(false);
    }, 3000); // 1 second

    return () => {
      clearTimeout(fadeOutTimeout);
    };
  }, [x, y, msgText]);

  useEffect(() => {
    if (msgs.at(-1)?.socketId === socketId) {
      const lastMsgContent = msgs.at(-1)?.content || "";
      const textSlice =
        lastMsgContent.slice(0, 30) + (lastMsgContent.length > 30 ? "..." : "");
      const timeToRead = Math.min(4000, Math.max(textSlice.length * 100, 1000));
      setMsgText(textSlice);
      // setShowText(true);
      const t = setTimeout(() => {
        setMsgText("");
        clearTimeout(t);
        // setShowText(false);
      }, timeToRead);
    }
  }, [msgs]);

  return (
    <motion.div
      animate={{
        x: x,
        y: y,
      }}
      className="w-6 h-6"
      transition={{
        duration: 0.2, // Adjust duration for smoothness
        ease: "easeOut", // Choose an easing function
      }}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <MousePointer2
        className="w-6 h-6 z-[9999999]"
        style={{ color: color }}
        strokeWidth={7.2}
      />
      <AnimatePresence>
        {showText && headerText && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: -7 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xs rounded-xl w-fit p-2 px-4 ml-4 cursor-can-hover cursor-can-hover cursor-can-hover cursor-can-hover"
            style={{
              backgroundColor: color + "f0",
            }}
          >
            <div className="text-nowrap">{headerText}</div>
            {msgText && <div className="font-mono w-44">{msgText}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RemoteCursors;
