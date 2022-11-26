import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Category } from "./sliceCategories";
import { RootState } from "./store";

export type SimulationRequestPayload = {
  id: string;
  hero: string;
  villian: string;
  heroCategory: Category;
  villianCategory: Category;
};

export type SimulationResponse = {
  id: string;
  hero: number;
  villian: number;
};

export type SimulationRequest = {
  id: string;
  payload: SimulationRequestPayload;
  response: SimulationResponse | null;
  inProcess: boolean;
  complete: boolean;
  heroCategory: Category;
  villianCategory: Category;
};

export const simulationRequestAdapter =
  createEntityAdapter<SimulationRequest>();

export const slice = createSlice({
  name: "simulationRequest",
  initialState: simulationRequestAdapter.getInitialState(),
  reducers: {
    createRequest: (state, action: PayloadAction<SimulationRequestPayload>) => {
      const simulationRequest: SimulationRequest = {
        payload: action.payload,
        id: action.payload.id,
        heroCategory: action.payload.heroCategory,
        villianCategory: action.payload.villianCategory,
        response: null,
        inProcess: true,
        complete: false,
      };
      simulationRequestAdapter.addOne(state, simulationRequest);
    },
    requestComplete: (state, action: PayloadAction<SimulationResponse>) => {
      simulationRequestAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { inProcess: false, response: action.payload, complete: true },
      });
    },
  },
});

export const { createRequest, requestComplete } = slice.actions;

export const simulationSelectors = simulationRequestAdapter.getSelectors(
  (state: RootState) => state.simulationRequests
);
