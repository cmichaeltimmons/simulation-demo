import React from "react";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
export const AppFab = () => {
  return (
    <Fab
      color="secondary"
      style={{
        position: "absolute",
        bottom: 32,
        right: 32,
      }}
      aria-label="edit"
    >
      <Add />
    </Fab>
  );
};
