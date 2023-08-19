import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    channelsInfo: chatReducer,
    messagesInfo: messagesReducer,
    modalInfo: modalReducer,
  },
});