"use client";
import React, { useContext, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

import { SocketContext, type User, type Message } from "@/contexts/socketio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Check, Edit, X } from "lucide-react";
import { Socket } from "socket.io-client";
import { cn } from "@/lib/utils";

const OnlineUsers = () => {
  const { socket, users: _users, msgs } = useContext(SocketContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainer = useRef<HTMLDivElement>(null);
  const users = Array.from(_users.values());

  // i know i know this code sucks, WILL FIX LATER
  const containerScrollBottom = () => {
    const t = setTimeout(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
      }
      clearTimeout(t);
    }, 1);
  };
  useEffect(containerScrollBottom, [msgs]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };
  const sendMessage = () => {
    if (!inputRef.current?.value) return;
    const msg = inputRef.current.value;
    inputRef.current.value = "";

    if (msg.trim() === "") return;
    socket?.emit("msg-send", {
      content: msg,
    });
  };
  const updateUsername = (newName: string) => {
    socket?.emit("username-change", {
      username: newName,
    });
    localStorage.setItem("username", newName);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "p-0 m-0 mr-4 h-fit w-fit transition-opacity duration-150",
            users.length <= 1 ? "opacity-0" : "opacity-100",
          )}
        >
          <div className="relative flex flex-col gap-2">
            <div className="flex items-center gap-2 h-fit">
              <div className="w-2 h-2 animate-pulse rounded-full bg-green-400"></div>
              {users.length} online
            </div>
            <div className="absolute bottom-0 right-0 h-2 text-[.13rem]">
              {/* <pre>/CHAT</pre> */}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs
          defaultValue="account"
          className="w-full h-[30rem] flex flex-col items-center no-hover-zone"
          onValueChange={(activeTab) => {
            if (activeTab === "chat") containerScrollBottom();
          }}
        >
          <TabsList className="w-full h-8">
            <TabsTrigger className="w-1/2 h-full" value="users">
              Users
            </TabsTrigger>
            <TabsTrigger className="w-1/2 h-full" value="chat">
              Chat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="w-full h-full overflow-auto">
            <ScrollArea className="w-full h-full modall">
              <motion.div>
                <div className="space-y-2 mb-8">
                  <p className="text-sm text-muted-foreground text-center">
                    There {users.length === 1 ? "is" : "are"} {users.length}{" "}
                    user
                    {users.length === 1 ? "" : "s"} online here!
                  </p>
                  {users.length <= 1 && (
                    <p className="text-xs font-mono text-muted-foreground text-center text-yellow-600">
                      (This is a feature not a bug
                      <br /> invite some friends!)
                    </p>
                  )}
                </div>
                <motion.ul
                  className="grid gap-4"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {users.map((user, i) => (
                    <UserItem
                      key={i}
                      user={user}
                      socket={socket}
                      updateUsername={updateUsername}
                    />
                  ))}
                </motion.ul>
              </motion.div>
            </ScrollArea>
          </TabsContent>
          <TabsContent
            value="chat"
            className="w-full flex-1 overflow-auto flex flex-col"
          >
            <div
              className="w-full h-full modall overflow-auto"
              ref={chatContainer}
            >
              {/* own, other and sys */}
              {msgs.map((msg, i) => (
                <div key={i}>
                  <span>
                    <span
                      style={{
                        color:
                          users.find((u) => u.socketId === msg.socketId)
                            ?.color || "#777",
                      }}
                      className="mr-2"
                    >
                      {msg.username} {msg.socketId === socket?.id && "(you)"}:
                    </span>
                    <span className="font-mono">{msg.content}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full h-20 flex items-center gap-2">
              <Input
                className="flex-1"
                ref={inputRef}
                placeholder="Enter message"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </TabsContent>
        </Tabs>
        {/* <div className="flex flex-col items-center justify-between"> */}
        {/*   <div className="w-full h-10 border-2 border-gray-600 flex rounded-lg"> */}
        {/*     <motion.div className="w-1/3 h-7 bg-slate-500 absolute"></motion.div> */}
        {/*     <div className="flex justify-center items-center z-3 flex-1"> */}
        {/*       users */}
        {/*     </div> */}
        {/*     <div className="flex justify-center items-center z-3 flex-1"> */}
        {/*       chats */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
      </PopoverContent>
    </Popover>
  );
};

export default OnlineUsers;

const UserItem = ({
  user,
  socket,
  updateUsername,
}: {
  user: User;
  socket: Socket | null;
  updateUsername: (username: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [newUsername, setNewUsername] = React.useState(user.name);
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  useEffect(() => {
    if (inputRef.current && isEditingName) inputRef.current.focus();
  }, [isEditingName]);
  const cancelEditing = () => {
    setNewUsername(user.name);
    setIsEditingName(false);
  };
  const saveEdit = () => {
    updateUsername(newUsername);
    setIsEditingName(false);
  };
  return (
    <motion.li
      key={user.socketId}
      className="flex items-center justify-between"
      variants={item}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: user.color }}
        ></div>
        {isEditingName ? (
          <>
            <Input
              value={newUsername}
              ref={inputRef}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-40"
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            />
            <Button variant={"ghost"} onClick={cancelEditing}>
              <X className="w-4 h-4" />
            </Button>
            <Button variant={"ghost"} onClick={saveEdit}>
              <Check className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <span className="text-sm">
              {user.name} {user.socketId === socket?.id && "(you)"}
            </span>
            {user.socketId === socket?.id && (
              <Button
                className="py-0 my-0"
                variant={"ghost"}
                onClick={() => setIsEditingName(true)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </motion.li>
  );
};
