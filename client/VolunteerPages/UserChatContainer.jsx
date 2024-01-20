import React, { useState, useEffect ,useRef} from "react";
import styled from "styled-components";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import ChatInput from "./ChatInput";
import { io } from "socket.io-client";
import ChatsService from "../src/services/ChatsService"; 
import UserService from "../src/services/UserService";
import Button from "@mui/material/Button";

export default function ChatContainer({currentChat,closeChat,withBack }) {
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
    socketRef.current.emit("add-user", getLocalStorageUser().volunteer_id);

    if (socketRef) {
      socketRef.current.on("msg-receive", (msg,from) => {
        console.log(from,currentChat);
        if(from===currentChat){ 
          console.log("message", msg);
          setArrivalMessage({ fromSelf: false, message: msg });
        }
      });
      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [currentChat]);
  

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);





  useEffect(() => {
    const data = getLocalStorageUser();
    const fetchChats = async () => {
      try {

      let chat = {
      sender_id : data.volunteer_id ,
      receiver_id : currentChat
      }
    const chatsResult = await ChatsService.getChat(chat);
    console.log(chatsResult.data.chats);

    const newMessages = chatsResult.data.chats.map(chat => {

    return {
      fromSelf: chat.sender_id === getLocalStorageUser().volunteer_id,
      message: chat.chat_text
    };
  });


setMessages(prev => [...prev, ...newMessages]);
console.log(currentChat)
   const getUser = await UserService.getUser(currentChat);
   
   setUserName(getUser.data.user.fullName)
   setUserImage(getUser.data.user.url);
      } catch (error) {
        console.error("Error fetching Chats:", error);
      }
    };
    fetchChats();

setVolunteerImage(data.url);
setVolunteerName(data.volunteer_name)

  }, []);



  useEffect(() => {
    if (containerRef.current) {
      
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  
  
  }, [messages]);

  const handleSendMsg = async (msg) => {
    const data = getLocalStorageUser();
    socketRef.current.emit("send-msg", {
      to: currentChat,
      from: data.volunteer_id,
      msg,
    });
  
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  
    let chat = {
      sender_id: data.volunteer_id,
      receiver_id: currentChat,
      sender_type: 'Volunteer',
      chat_text: msg
    };
    const insertMessage = await ChatsService.insertChat(chat);
  

  };
  






  return (
    <> 
     {withBack&&  <Button variant="contained" color="primary" onClick={closeChat}>
    Back
  </Button>
}
  <div style={{ display: 'flex', alignItems: 'center', margin: '20px', paddingLeft: 300 }}>
  <img style={{ width: '60px', height: '60px', borderRadius: '50%' }} src={userImage} alt="User" />
  <h5 style={{ marginLeft: '10px', width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</h5>
</div>


  <div style={{paddingLeft:300}}>
    <Container>

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
          src={message.fromSelf ? volunteerImage  : userImage}
          alt={message.fromSelf ? "Volunteer" : "User"}
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
    </div>
    </>
  );
 
}const Container = styled.div`

display: flex;
max-width : 300px
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
  padding: 0.5rem 1rem;
  display: flex;
   flex-direction: column;
  gap: 0.25rem;

  .message {
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0;
    align-items: ${props => (props.fromSelf ? 'flex-end' : 'flex-start')};
    padding: 10px;
    border-radius: 10px;

    .content {
      white-space: normal;
      overflow-wrap: break-word;
      padding: 10px;
      font-size: 1rem;
      border-radius: 10px;
      color: #000;

      &.user-content {
        background-color: #49BEB7; 
        color: white;
      }
      &.volunteer-content {
        background-color: #ccc; 
      }
    }

    .message-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .user-image {
      height: 40px;
      width: 40px;
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
`;
