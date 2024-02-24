import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  initialState,
  name: "messages",
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
    updateMessage: messagesAdapter.updateOne,
  },
});

export const { actions } = slice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default slice.reducer;
