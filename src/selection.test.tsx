import React from "react";
import { render, screen } from "./tests-utils";

it("Should Render", () => {
  const Subject = () => <div>Hello</div>;
  render(<Subject />);

  expect(screen.getByText("Hello")).toBeInTheDocument();
});
