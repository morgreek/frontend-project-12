import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const slice = createSlice(
  {
    initialState,
    name: 'channels',
    reducers: {
      addChannel: channelsAdapter.addOne,
      addChannels: channelsAdapter.addMany,
      removeChannel: channelsAdapter.removeOne,
      updateChannel: channelsAdapter.updateOne,
    },
  },
);

export const { actions } = slice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default slice.reducer;
