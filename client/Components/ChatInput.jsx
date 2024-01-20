import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

export default function ChatInput({ handleSendMsg }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (currentMessage.length > 0) {
      handleSendMsg(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <InputContainer onSubmit={sendChat}>
      <ChatFooter>
        <InputField
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendChat();
          }}
        />
        <SendButton onClick={sendChat}>
          <IoMdSend style={{ marginRight: "8px" }} />
          Send
        </SendButton>
      </ChatFooter>
    </InputContainer>
  );
}
