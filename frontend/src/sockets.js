import io from 'socket.io-client';

export const socket = io();

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
