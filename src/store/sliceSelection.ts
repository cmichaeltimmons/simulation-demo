import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Selection = {
  id: string;
  selectedCategoryId: string;
  cellIds: string[];
  categoryIds: string[];
};

export const selectionAdapter = createEntityAdapter<Selection>();

const initialState = selectionAdapter.getInitialState();

export const slice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    updateSelectedCategory: (
      state,
      action: PayloadAction<{ selectionId: string; newCategoryId: string }>
    ) => {
      const { selectionId, newCategoryId } = action.payload;
      selectionAdapter.updateOne(state, {
        id: selectionId,
        changes: {
          selectedCategoryId: newCategoryId,
        },
      });
    },
  },
});

export const { updateSelectedCategory } = slice.actions;

export const selectionSelectors = selectionAdapter.getSelectors(
  (state: RootState) => state.selections
);
