/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import LoginPage from './Components/LoginPage.jsx';
import Navigation from './Components/Navigation.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import store from './slices/index.js';
import SocketContext from './context/SocketContext.jsx';
import SignUp from './Components/SignUp.jsx';
import routes from './routes.js';
import resources from './locales/index.js';
import sockets, { socket } from './sockets';
import { addChannel, renameChannel, removeChannel } from './slices/chatSlice.js';
import { addMessages } from './slices/messagesSlice.js';

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

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SocketContext.Provider value={sockets}>
            <AuthProvider>
              <div className="d-flex flex-column h-100">
                <Router>
                  <Navigation />
                  <Routes>
                    <Route path={routes.loginPagePath()} element={<LoginPage />} />
                    <Route path={routes.signupPagePath()} element={<SignUp />} />
                    <Route path={routes.chatPagePath()} element={(<PrivateRoute />)} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Router>
              </div>
              <div className="Toastify"><ToastContainer /></div>
            </AuthProvider>
          </SocketContext.Provider>
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
