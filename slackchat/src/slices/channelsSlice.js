import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const slice = createSlice(
    {
        name: 'channels',
        initialState,
        reducers: {
            addChannels: channelsAdapter.addMany,
            addChannel: channelsAdapter.addOne,
            updateChannel: channelsAdapter.updateOne,
            removeChannel: channelsAdapter.removeOne,
        },
    }
);

export const actions = slice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default slice.reducer;
