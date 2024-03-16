import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: 'modals',
  initialState: { modalCode: null },
  reducers: {
    setModalCode: (state, { payload }) => {
      state.modalCode = payload;
    },

    clearModalCode: (state) => {
      state.modalCode = null;
    },
  },

});

export const { actions } = slice;
export default slice.reducer;
