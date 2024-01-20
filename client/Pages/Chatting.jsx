import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../Components/ChatContainer";
import ChatInput from "../Components/ChatInput";

export default function Chat({ volunteer ,closeChat,withBack }) {

const [volunteerId,setVolunteerId] = useState(volunteer);

useEffect(()=>{
  setVolunteerId(volunteer);
},[volunteerId])


  return (

      <div className="container">
      
      <ChatContainer currentChat={volunteer} closeChat={closeChat} withBack={withBack} />

      </div>

  );
}

