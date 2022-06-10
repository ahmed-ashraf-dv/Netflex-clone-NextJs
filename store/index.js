import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./ModalSlice";

const store = configureStore({
  reducer: { ModalSlice },
});

export default store;
