import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, receiveMessage } from './chatSlice';
import { Box, TextField, Button, List, ListItem, ListItemText, Avatar } from '@mui/material';

// Avatar URLs
const userAvatar = 'https://randomuser.me/api/portraits/men/75.jpg';  // Example user avatar
const botAvatar = 'https://randomuser.me/api/portraits/women/76.jpg'; // Example bot avatar

// Predefined responses based on user messages
const getBotResponse = (message) => {
  const lowercaseMessage = message.toLowerCase();
  switch (lowercaseMessage) {
    case 'hi':
      return 'Hello!';
    case 'hello':
      return 'Hi there!';
    case 'what is your name?':
      return 'I am a friendly bot 😊';
    case 'what are you doing?':
      return 'Just chatting with you!';
    default:
      return 'I didn’t quite catch that. Could you repeat?';
  }
};

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');

  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      const userMessage = input;
      setInput('');
      // Simulate bot response after 1 second
      setTimeout(() => {
        const botReply = getBotResponse(userMessage);
        dispatch(receiveMessage(botReply));
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: '90%', // 90% of the viewport width
        margin: '0 auto', // Center it horizontally
        mt: 5,
        height: '90vh', // Full-screen height (minus margins)
        p: 2,
        borderRadius: '8px',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Beautiful gradient background
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space between chat display and input
      }}
    >
      <Box
        sx={{
          flexGrow: 1, // Take up available space for the chat window
          overflowY: 'auto',
          p: 0,
          backgroundColor: '#fff', // Background for the chat box
          borderRadius: '12px',
          padding: '16px',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <List sx={{ maxHeight: '100%', overflowY: 'auto', p: 0 }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'Bot' ? 'flex-start' : 'flex-end',
                mb: 1,
              }}
            >
              {message.sender === 'Bot' && (
                <Avatar src={botAvatar} sx={{ mr: 1 }} />
              )}
              <ListItemText
                primary={message.text}
                secondary={message.timestamp}
                sx={{
                  bgcolor: message.sender === 'Bot' ? '#efefef' : '#3f8efc',
                  color: message.sender === 'Bot' ? '#000' : '#fff',
                  borderRadius: message.sender === 'Bot' ? '16px 16px 16px 0' : '16px 16px 0 16px',
                  p: 1.5,
                  maxWidth: '60%',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
              {message.sender !== 'Bot' && (
                <Avatar src={userAvatar} sx={{ ml: 1 }} />
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          variant="outlined"
          sx={{
            flexGrow: 1,
            borderRadius: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{ ml: 2, bgcolor: '#3f8efc', borderRadius: '20px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
