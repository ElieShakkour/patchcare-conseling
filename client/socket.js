import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { getLocalStorageUser } from "./UTILS/localStorageUtils";


const SocketContext = createContext();

const socket = io.connect("http://localhost:3001");

const ChatProvider = ({ children }) => {
  const [messageList, setMessageList] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketConnected(true);
    });

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ messageList, socket, socketConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ChatProvider };


