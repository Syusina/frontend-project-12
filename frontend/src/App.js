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
import Chat from './Components/Chat.jsx';
import Navigation from './Components/Navigation.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import store from './slices/index.js';
import SocketContext from './context/SocketContext.jsx';
import SignUp from './Components/SugnUp.jsx';
import routes from './routes.js';
import resources from './locales/index.js';
import sockets from './sockets';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
});

const censorshipDictionaryRu = leoProfanity.getDictionary('ru');
leoProfanity.add(censorshipDictionaryRu);

const rollbarConfig = {
  accessToken: '60855e9d0abb4c74978701a42376016a',
  environment: 'testenv',
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
                    <Route path="*" element={<PageNotFound />} />
                    <Route path={routes.signupPagePath()} element={<SignUp />} />
                    <Route
                      path={routes.chatPagePath()}
                      element={(
                        <PrivateRoute>
                          <Chat />
                        </PrivateRoute>
                      )}
                    />
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
