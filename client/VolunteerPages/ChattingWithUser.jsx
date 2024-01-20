import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "./UserChatContainer";

export default function Chat({ user ,closeChat,withBack }) {


//   useEffect(() => {
//     console.log("user",socket)
//     if (user) {
//       socket.current = io("http://localhost:3001");
//       socket.current.emit("add-user", user);
//     }
//     console.log("user2",socket)
//   }, [user]);



  return (
    
    <div className="container">
      
      <ChatContainer currentChat={user} closeChat={closeChat} withBack={withBack} />

      </div>

  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
