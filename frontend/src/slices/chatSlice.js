/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const chatSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: defaultChannelId,
  },
  reducers: {
    loadChannels(state, { payload }) {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },

    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },

    addChannel(state, { payload }) {
      state.channels.push(payload);
    },

    renameChannel(state, { payload }) {
      const channel = state.channels.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },

    removeChannel(state, { payload }) {
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload.id,
      );
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = defaultChannelId;
      }
    },
  },
});

export const {
  loadChannels, setCurrentChannel, addChannel, renameChannel, removeChannel,
} = chatSlice.actions;
export default chatSlice.reducer;
