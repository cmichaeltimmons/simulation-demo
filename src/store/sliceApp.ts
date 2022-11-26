import { createSlice } from "@reduxjs/toolkit";

export type App = {
  visibleScenarioId: string;
};

const initialState: App = {
  visibleScenarioId: "",
};

export const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {},
});
