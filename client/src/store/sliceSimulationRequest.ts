import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

export type SimulationRequestPayload = {
  id: string;
  hero: string;
  villian: string;
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
        response: null,
        inProcess: true,
      };
      simulationRequestAdapter.addOne(state, simulationRequest);
    },
    requestComplete: (state, action: PayloadAction<SimulationResponse>) => {
      simulationRequestAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { inProcess: false, response: action.payload },
      });
    },
  },
});

export const { createRequest, requestComplete } = slice.actions;

export const simulationSelectors = simulationRequestAdapter.getSelectors(
  (state: RootState) => state.SimulationRequests
);
