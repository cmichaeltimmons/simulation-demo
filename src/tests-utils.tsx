import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { Cell, Selection, Category } from "./types";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

type CellData = {};
type SelectionData = {};
type CategoryData = {};

const categoryAdapter = createEntityAdapter<Category<CategoryData>>({});
const selectionAdapter = createEntityAdapter<Selection<SelectionData>>({});
const cellAdapter = createEntityAdapter<Cell<CellData>>({});

const createInitialSate = () => {
  const initialState = {
    categories: categoryAdapter.getInitialState(),
    selections: selectionAdapter.getInitialState(),
    cells: cellAdapter.getInitialState(),
  };
  return initialState;
};

type RenderParams = Parameters<typeof rtlRender>;

export const createStore = () =>
  configureStore({
    reducer: {},
  });

function render(ui: RenderParams[0]) {
  const store = createStore();
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from "@testing-library/react";
export { render };
