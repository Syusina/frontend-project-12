import { createSlice } from '@reduxjs/toolkit';
import { loadChannels, removeChannel } from './chatSlice';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChannels, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(removeChannel, (state, { payload }) => {
        state.messages = state.messages.filter(({ channelId }) => channelId !== payload.id);
      }
    );
  },
});

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;