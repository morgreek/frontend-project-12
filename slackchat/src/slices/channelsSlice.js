import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();
const defaultChannelId = 1;

const slice = createSlice(
  {
    initialState: { ...initialState, currentChannelId: defaultChannelId },
    name: 'channels',
    reducers: {
      addChannel: channelsAdapter.addOne,
      addChannels: channelsAdapter.addMany,
      removeChannel: channelsAdapter.removeOne,
      updateChannel: channelsAdapter.updateOne,
      setCurrentChannelId: (state, { payload }) => {
        // eslint-disable-next-line
        state.currentChannelId = payload;
      },
    },
  },
);

export const { actions } = slice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default slice.reducer;
