import { createSlice } from "@reduxjs/toolkit";

export type App = {
  visibleSimulationId: string;
};

const initialState: App = {
  visibleSimulationId: "",
};

export const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {},
});
