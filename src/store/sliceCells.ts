import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

export type Cell = {
  id: string;
  previousCategoryId: string;
  currentCategoryId: string;
  selectionId: string;
  num: number;
};

export const cellsAdapter = createEntityAdapter<Cell>({});

const initialState = cellsAdapter.getInitialState();

export const slice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    updateCell: cellsAdapter.updateOne,
    backToPrevious: (state, action: PayloadAction<string>) => {
      let entity = state.entities[action.payload]!;
      entity.currentCategoryId = entity.previousCategoryId;
    },
    newCategory: (
      state,
      action: PayloadAction<{ cellId: string; selectedCategoryId: string }>
    ) => {
      let entity = state.entities[action.payload.cellId]!;
      entity.previousCategoryId = entity.currentCategoryId;
      entity.currentCategoryId = action.payload.selectedCategoryId;
    },
  },
});

export const { backToPrevious, newCategory, updateCell } = slice.actions;

export const thunkNewCategory = (args: { cellId: string }): AppThunk<void> => (
  dispatch,
  getState
) => {
  const { cellId } = args;
  const state = getState();
  const cell = state.cells.entities[args.cellId]!;
  const selection = state.selections.entities[cell.selectionId]!;
  const { selectedCategoryId } = selection;
  dispatch(newCategory({ cellId, selectedCategoryId }));
};

export const selectors = cellsAdapter.getSelectors(
  (state: RootState) => state.cells
);
