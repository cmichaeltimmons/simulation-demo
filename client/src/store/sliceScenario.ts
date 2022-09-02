import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Scenario = {
  id: string;
  heroSelectionId: string;
  villianSelectionId: string;
  requestId: string | null;
};

export const scenarioAdapter = createEntityAdapter<Scenario>();

export const slice = createSlice({
  name: "scenario",
  initialState: scenarioAdapter.getInitialState(),
  reducers: {
    updateScenario: scenarioAdapter.updateOne,
  },
});

export const scenarioSelectors = scenarioAdapter.getSelectors(
  (state: RootState) => state.scenario
);

export const { updateScenario } = slice.actions;
