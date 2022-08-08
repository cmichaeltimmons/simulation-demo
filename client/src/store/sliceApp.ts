import { createSlice } from "@reduxjs/toolkit";

export type App = {
  visibleSimulation: string;
};

const initialState: App = {
    visibleSimulation: "",
}

export const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {},
});
