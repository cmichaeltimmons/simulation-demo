import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Simulation = {
  id: string;
  heroSelectionId: string;
  villianSelectionId: string;
};

export const simulationAdapter = createEntityAdapter<Simulation>();

export const slice = createSlice({
  name: "simulations",
  initialState: simulationAdapter.getInitialState(),
  reducers: {},
});

export const simulationSelectors = simulationAdapter.getSelectors(
  (state: RootState) => state.simulations
);
