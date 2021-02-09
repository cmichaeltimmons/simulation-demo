import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "./store/store";

type RenderParams = Parameters<typeof rtlRender>;

function render(ui: RenderParams[0]) {
  const store = createStore();
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
