/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
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
import resources from './locales/index.js';

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

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
});

const App = () => (
  <div className="d-flex flex-column h-100">
    <SocketContext.Provider value={sockets}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
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
          </AuthProvider>
        </I18nextProvider>
      </Provider>
    </SocketContext.Provider>
  </div>
);

export default App;
