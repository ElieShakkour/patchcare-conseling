import React, { useState, useEffect ,useRef  } from "react";
import styled from "styled-components";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import ChatInput from "./ChatInput"  ;
import { io } from "socket.io-client";
import ChatsService from "../services/ChatsService";
import VolunteerService from ".././services/VolunteerService";
import Button from "@mui/material/Button";

export default function ChatContainer({ currentChat,closeChat,withBack }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userImage,setUserImage] = useState(null);
  const [userName,setUserName] = useState(null);
  const [volunteerImage,setVolunteerImage] = useState(null);
  const [volunteerName,setVolunteerName] = useState(null);
  
  const socketRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://127.0.0.1:3001");
    socketRef.current.emit("add-user", getLocalStorageUser().user_id);

    socketRef.current.on("msg-receive", (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    });

   
    return () => {
      socketRef.current.disconnect();
    };
  }, [currentChat.volunteer_id]);



  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);


  
  useEffect(() => {
    const data = getLocalStorageUser();
    const fetchChats = async () => {
      try {

let chat = {
  sender_id : data.user_id ,
  receiver_id : currentChat.volunteer_id
}
   const chatsResult = await ChatsService.getChat(chat);
   
   const newMessages = chatsResult.data.chats.map(chat => {
    return {
      fromSelf: chat.sender_id === getLocalStorageUser().user_id,
      message: chat.chat_text
    };
  });
setMessages(prev => [...prev, ...newMessages]);
var getVolunteer;
    if(chatsResult.data.chats[0].receiver_id===getLocalStorageUser().user_id){ 
    getVolunteer = await VolunteerService.getVolunteer(chatsResult.data.chats[0].sender_id);
    }else{
      getVolunteer = await VolunteerService.getVolunteer(chatsResult.data.chats[0].receiver_id);
  
    }
   console.log("volunteer ",getVolunteer.data.volunteer)
   setVolunteerName(getVolunteer.data.volunteer.volunteer_name)
   setVolunteerImage(getVolunteer.data.volunteer.url);
      } catch (error) {
        console.error("Error fetching Chats:", error);
      }
    };
    fetchChats();

setUserImage(data.url);
setUserName(data.fullName)
console.log("messages4",messages)

  
  }, []);



  useEffect(() => {
    if (containerRef.current) {
      
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  
  
  }, [messages]);

  
  const handleSendMsg = async(msg) => {
    const data = getLocalStorageUser();
    socketRef.current.emit("send-msg", {
      to:  currentChat.volunteer_id,
      from: data.user_id,
      msg,
    });

    const updatedMessages = [...messages, { fromSelf: true, message: msg }];
    setMessages(updatedMessages);


    console.log("messages2",messages)

  
  
    let chat = {
      sender_id: data.user_id ,
      receiver_id: currentChat.volunteer_id,
      sender_type: 'User',
      chat_text: msg
    };
    const insertMessage = await ChatsService.insertChat(chat);
    console.log("messages1",messages)

  
  };



  return (
    <> 
     {withBack&&  <Button variant="contained" color="primary" onClick={closeChat}>
    Back
  </Button>
}
  <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 300 }}>  
      <img style={{ width: 60, height: 60, borderRadius: 50 }} src={volunteerImage} />
      <h5>{volunteerName}</h5>
    </div>
   
    <Container style={{paddingLeft:300}}>

   
      <div className="chat-messages">

        <MessagesContainer ref={containerRef}>
        {messages.map((message, index) => (
         
  <div
    key={index}
    className={`message ${message.fromSelf ? "user-sent" : "received"}`}
  >
    <div className={`content ${message.fromSelf ? "user-content" : "volunteer-content"}`}>
      <div className="message-container">
        <img
          className={`user-image ${message.fromSelf ? "user-sent-image" : ""}`}
          src={message.fromSelf ? userImage : volunteerImage}
          alt={message.fromSelf ? "User" : "Volunteer"}
        />
        <p className="message-text">{message.message}</p>
      </div>
    </div>
  </div>
))}
        </MessagesContainer>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </Container>
    </>
  );
 
}

const Container = styled.div`
display: flex;
justify-content: center; 
align-items: center; 
height: 60vh; 
width: 900px;

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
`;

const MessagesContainer = styled.div`
background-color: #f4f4f4; 
border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem 1rem; /* Reduce padding */
  display: flex;
  flex-direction: column;
  gap: 0.25rem; /* Reduce gap between messages */

  .message {
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0; /* Add margin to create spacing between sender and receiver messages */
    align-items: ${props => props.fromSelf ? 'flex-end' : 'flex-start'};

    .content {
      white-space: normal;
      overflow-wrap: break-word;
      padding: 0.5rem; /* Reduce padding */
      font-size: 1rem; /* Reduce font size */
      border-radius: 1rem;
      color: #000;

      &.user-content {
        background-color: #ccc;
      }
    }

    .message-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .user-image {
      height: 40px; /* Reduce image size */
      width: 40px; /* Reduce image size */
      border-radius: 50%;
    }

    .user-sent-image {
      order: 1;
    }

    .message-text {
      flex: 1;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .user-sent {
    align-items: flex-end;
  }

  .volunteer-sent {
    align-items: flex-start;
  }
  .sended {
    .content {
      background-color: #4f04ff21;
    }
  }
  .received {
    .content {
      background-color: #49BEB7;
    }
  }
`;

