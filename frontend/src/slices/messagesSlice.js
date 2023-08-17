import { createSlice } from '@reduxjs/toolkit';

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
});

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;