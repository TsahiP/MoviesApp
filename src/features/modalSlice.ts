import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../app/createAppSlice";
// import type { AppThunk } from "../app/store";
import { MovieResult,IMovie } from "../types/movie";

// type
export interface IModal {
  isOpen: boolean;
  data: MovieResult | null;

}

const initialState: IModal = {
  isOpen: false,
  data: null,
};

// slice
export const modalDataSlice = createAppSlice({
  name: "modalData",
  initialState,
  reducers: {
    openMovieModal: (state: IModal
      , action: PayloadAction<MovieResult>
    ) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    closeMovieModal: (state: IModal) => {
      state.isOpen = false;
        state.data = null;
    },
    

  },

  selectors: {
    selectIsOpen: (state: IModal) => state.isOpen,
    selectData: (state: IModal) => state.data,
  },
});
// Action creators are generated for each case reducer function.
export const {  openMovieModal, closeMovieModal } = modalDataSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIsOpen, selectData } = modalDataSlice.selectors;
