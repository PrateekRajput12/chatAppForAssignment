import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [], // Holds the messages (both sent and received)
  currentUser: 'User1', // Mock current user
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        text: action.payload,
        sender: state.currentUser,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        text: action.payload,
        sender: 'Bot',
        timestamp: new Date().toLocaleTimeString(),
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
