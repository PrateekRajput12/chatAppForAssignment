import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Chat from './Chat.js';

function App() {
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
}

export default App;
