import { useState } from "react";
import styled from "styled-components";
import { CircularProgress } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatbotTab = styled.div`
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const ChatbotPopup = styled.div`
  width: 320px;
  max-height: 450px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #2b6777;
  color: white;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const ChatContent = styled.div`
  padding: 10px;
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  text-align: ${({ sender }) => (sender === "user" ? "right" : "left")};
  color: ${({ sender }) => (sender === "user" ? "#2b6777" : "black")};
  margin: 5px 0;
  padding: 8px;
  background-color: ${({ sender }) => (sender === "user" ? "#e0f7fa" : "#eaeaea")};
  border-radius: 10px;
  max-width: 80%;
  margin-left: ${({ sender }) => (sender === "user" ? "auto" : "0")};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: white;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: #2b6777;
  color: white;
`;

const SendButton = styled.button`
  background-color: #2b6777;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  font-size: 18px;
  color: white;
`;

const TypingIndicator = styled.div`
  color: gray;
  font-size: 12px;
  padding: 5px;
  text-align: left;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: input }),
      });

      const data = await response.json();

      const botText =
        typeof data === "string"
          ? data
          : data.message || JSON.stringify(data);

      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage =
        error.message || "Error connecting to chatbot API.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatbotContainer>
      <ChatbotTab onClick={toggleChatbot}>
        <ChatIcon style={{ fontSize: "40px", color: "#2b6777" }} />
      </ChatbotTab>

      {isOpen && (
        <ChatbotPopup>
          <ChatHeader>
            Chatbot
            <CloseButton onClick={toggleChatbot}>✖</CloseButton>
          </ChatHeader>
          <ChatContent>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text}
              </Message>
            ))}
            {isTyping && (
              <LoadingIndicator>
                <CircularProgress size={20} />
                <TypingIndicator>Typing.....</TypingIndicator>
              </LoadingIndicator>
            )}
          </ChatContent>

          <InputContainer>
            <ChatInput
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message.."
            />
            <SendButton onClick={sendMessage}>Send</SendButton>
          </InputContainer>
        </ChatbotPopup>
      )}
    </ChatbotContainer>
  );
};

export default Chatbot;