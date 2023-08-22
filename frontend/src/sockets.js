import io from 'socket.io-client';
import store from './slices/index.js';
import { addChannel, renameChannel, removeChannel } from './slices/chatSlice.js';
import { addMessages } from './slices/messagesSlice.js';

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

export default sockets;