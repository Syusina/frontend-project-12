import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import SocketContext from './context/SocketContext.jsx';
import resources from './locales/index.js';
import sockets, { socket } from './sockets';
import { addChannel, renameChannel, removeChannel } from './slices/chatSlice.js';
import { addMessages } from './slices/messagesSlice.js';
import App from './App.js';

const init = () => {
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

  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const censorshipDictionaryRu = leoProfanity.getDictionary('ru');
  leoProfanity.add(censorshipDictionaryRu);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'dev',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketContext.Provider value={sockets}>
              <App />
            </SocketContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
