import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { SocketContext } from "@/contexts/socketio";

const OnlineUsers = () => {
  const { remoteCursors } = useContext(SocketContext);
  const cursors = Array.from(remoteCursors.values());
  if (cursors.length === 0) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <span> {cursors.length} online</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52">
        <div className="grid gap-4">
          {cursors.map((cursor) => (
            <div key={cursor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: cursor.color }}
                ></div>
                <span className="text-sm">{cursor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OnlineUsers;
