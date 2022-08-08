import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Simulation = {
  heroSelectionId: string;
  villianSelectionId: string;
};

export const simulationAdapter = createEntityAdapter<Simulation>();

export const slice = createSlice({
  name: "simulations",
  initialState: simulationAdapter.getInitialState(),
  reducers: {},
});

const simulationSelectors = simulationAdapter.getSelectors(
    (state: RootState) => state.simulations
);