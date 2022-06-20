import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: { isOpen: false, id: null, currentVideoId: "" },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.currentVideoId = payload.currentVideoId;
      state.id = payload.id;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.currentVideoId = "";
    },
  },
});

export default ModalSlice.reducer;

export const { openModal, closeModal } = ModalSlice.actions;
