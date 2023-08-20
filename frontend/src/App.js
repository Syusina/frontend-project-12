/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import LoginPage from './Components/LoginPage.jsx';
import Chat from './Components/Chat.jsx';
import Navigation from './Components/Navigation.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import store from './slices/index.js';
import SocketContext from './context/SocketContext.jsx';
import { addChannel, renameChannel, removeChannel } from './slices/chatSlice.js';
import { addMessages } from './slices/messagesSlice.js';
import SignUp from './Components/SugnUp.jsx';

const socket = io();

socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload));
});

socket.on('newMessage', (payload) => {
  store.dispatch(addMessages(payload));
});

socket.on('renameChannel', (payload) => {
  store.dispatch(renameChannel(payload));
});

socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload));
});

const promise = (type, data) => new Promise((resolve, reject) => {
  socket.emit(type, data, (response) => {
    if (response.status === 'ok') {
      resolve(response.data);
    } else {
      reject();
    }
  });
});

const sockets = {
  newChannel: (channel) => promise('newChannel', channel),
  newMessage: (message) => promise('newMessage', message),
  renameChannel: (channel) => promise('renameChannel', channel),
  removeChannel: (id) => promise('removeChannel', id),
};

const App = () => (
  <SocketContext.Provider value={sockets}>
    <Provider store={store}>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <Router>
            <Navigation />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                )}
              />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </Provider>
  </SocketContext.Provider>
);

export default App;
