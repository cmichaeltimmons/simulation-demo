import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { slice as categoriesSlice } from "./sliceCategories";
import { slice as cellsSlice } from "./sliceCells";
import { slice as selectionSlice } from "./sliceSelection";
import { slice as appSlice } from './sliceApp';
import { slice as simulationSlice } from "./sliceSimulation"; 
import { createDefaultState } from "./createDefaultState";

const preloadedState = createDefaultState();
type PreLoadedStateType = typeof preloadedState;

export const createStore = (preloadedState = {} as PreLoadedStateType) =>
  configureStore({
    preloadedState,
    reducer: {
      simulations: simulationSlice.reducer,
      categories: categoriesSlice.reducer,
      cells: cellsSlice.reducer,
      selections: selectionSlice.reducer,
      app: appSlice.reducer
    },
  });

const store = createStore(preloadedState);

export type RootState = ReturnType<typeof store.getState>;

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
