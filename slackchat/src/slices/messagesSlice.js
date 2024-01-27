import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    updateMessage: messagesAdapter.updateOne,
  },
});

export const actions = slice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.channels);
export default slice.reducer;