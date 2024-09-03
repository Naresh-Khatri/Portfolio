import React, { useContext, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

import { SocketContext } from "@/contexts/socketio";

const OnlineUsers = () => {
  const { remoteCursors } = useContext(SocketContext);
  const cursors = Array.from(remoteCursors.values());
  if (cursors.length === 0) return null;
  const listParent = useRef<HTMLUListElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="py-0 m-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 animate-pulse rounded-full bg-green-400"></div>
            {cursors.length} online
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2 mb-8">
          <h4 className="text-xl">Users</h4>
          <p className="text-sm text-muted-foreground">
            There {cursors.length === 1 ? "is" : "are"} {cursors.length} user
            {cursors.length === 1 ? "" : "s"} online here!
          </p>
        </div>
        <motion.ul
          className="grid gap-4"
          ref={listParent}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {cursors.map((cursor, i) => (
            <motion.li
              key={cursor.id}
              className="flex items-center justify-between"
              variants={item}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: cursor.color }}
                ></div>
                <span className="text-sm">{cursor.name}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </PopoverContent>
    </Popover>
  );
};

export default OnlineUsers;
