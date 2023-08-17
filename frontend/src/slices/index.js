import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    channelsInfo: chatReducer,
    messagesInfo: messagesReducer,
  },
});