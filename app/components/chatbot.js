// components/Chatbot.js
"use client";
import { useState } from 'react';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatbotTab = styled.div`
  background-color: #4b0082;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
`;

const ChatbotPopup = styled.div`
  width: 300px;
  max-height: 400px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatContent = styled.div`
  padding: 10px;
  flex-grow: 1;
  overflow-y: auto;
`;

const Message = styled.div`
  text-align: ${({ sender }) => (sender === 'user' ? 'right' : 'left')};
  color: ${({ sender }) => (sender === 'user' ? 'blue' : 'black')};
  margin: 5px 0;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 5px;
  border-top: 1px solid #eaeaea;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 10px;
  border-radius: 5px;
`;

const SendButton = styled.button`
  background-color: #4b0082;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-left: 5px;
  cursor: pointer;
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: input }),
      });
      const data = await response.json();
      console.log(data);
      const botMessage = { sender: 'bot', text: data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error connecting to chatbot API.' }]);
    }

    setInput('');
  };

  return (
    <ChatbotContainer>
      <ChatbotTab onClick={toggleChatbot}>
        Chatbot
      </ChatbotTab>

      {isOpen && (
        <ChatbotPopup>
          <ChatContent>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text}
              </Message>
            ))}
          </ChatContent>

          <InputContainer>
            <ChatInput
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <SendButton onClick={sendMessage}>Send</SendButton>
          </InputContainer>
        </ChatbotPopup>
      )}
    </ChatbotContainer>
  );
};

export default Chatbot;
