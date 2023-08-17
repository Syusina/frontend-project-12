import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
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
  },
});

export const { loadChannels, setCurrentChannel, addChannel } = chatSlice.actions;
export default chatSlice.reducer;