import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";

import ChatsService from "../src/services/ChatsService";

import Chat from "./ChattingWithUser";

import VolunteerService from "../src/services/VolunteerService";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import UserService from "../src/services/UserService";

const VolunteerChatPage = () => {
  const [chatsList, setChatsList] = useState([]);
  const [openChatID, setOpenChatId] = useState(null);
  const [chatContacts, setChatContacts] = useState([]);
  
  useEffect(() => {
    const fetchChats = async () => {
      const chatResult = await ChatsService.getChatsOfUser(getLocalStorageUser().volunteer_id).catch(error => {
      });
      setChatsList(chatResult.data.chats);
      const currentUserID = getLocalStorageUser().volunteer_id;
      const uniqueIDs = new Set();
      chatResult.data.chats.forEach((chat) => {
        if (chat.sender_id !== currentUserID) {
          uniqueIDs.add(chat.sender_id);
        }
        if (chat.receiver_id !== currentUserID) {
          uniqueIDs.add(chat.receiver_id);
        }
      });
      const distinctIDs = [...uniqueIDs];
      setChatsList(distinctIDs);
    };
  
    fetchChats();
    console.log(chatsList);
  }, []);
  
  useEffect(() => {
    const fetchContacts = async () => {
      if (chatsList) {
        const contacts = [];
        for (let i = 0; i < chatsList.length; i++) {
          if(chatsList[i]!==null){ 
          const userData = (await UserService.getUser(chatsList[i])).data.user;
          contacts.push(userData);
          }
        }
        setChatContacts(contacts);
      }
    };

    fetchContacts();
  }, [chatsList]);


  const handleOpenChat = (chatId) => {
      setOpenChatId(chatId);
  };

  const closeChat = ()=>{
    setOpenChatId(null);
  }

  
  return (
    <div className="chat-container" >
    <MDBRow>
      <MDBCol md="3" lg="3" xl="2" className="mb-4 mb-md-0">
        <h1 style={{ color: '#0D5D65', fontSize: '43px' }}>My Chats</h1>
        <MDBCard >
          <MDBCardBody>
            <MDBTypography listUnStyled className="mb-0">
              {chatContacts.map((user) => (
                <li
                  className="p-2 border-bottom"
                  style={{ backgroundColor: "#eee" }}
                  key={user.user_id}
                  onClick={() => handleOpenChat(user.user_id)}
                >
                  <div className="d-flex flex-row">
                    <img
                      src={user.url}
                      alt={user.fullName}
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">{user.fullName}</p>
                    </div>
                  </div>
                </li>
              ))}
            </MDBTypography>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="6" lg="7" xl="8">
        <div className="chat-window">
          {(openChatID)? (
            <Chat key={openChatID} user = { openChatID }  closeChat={closeChat} withBack={false} />
          ):<h1 style={{ color: '#0D5D65', fontSize: '43px', width:600}}>Press a User To Chat With</h1>}
        </div>
      </MDBCol>
    </MDBRow>
  </div>
  
  );
};

export default VolunteerChatPage;
