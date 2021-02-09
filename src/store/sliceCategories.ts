import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Category = {
  id: string;
  fill: string;
  name: string;
};

export const categoryAdapter = createEntityAdapter<Category>({});

const initialState = categoryAdapter.getInitialState();

export const slice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
});

export const selectors = categoryAdapter.getSelectors((state: RootState) => {
  return state.categories;
});
