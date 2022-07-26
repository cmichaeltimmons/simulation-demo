import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Grid } from "./components/Grid";
import { selectors } from "./store/sliceSelection";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

export const Demo = () => {
  const selectionIds = useSelector((state: RootState) =>
    selectors.selectIds(state)
  ) as string[];
  return (
    <>
      <AppBar color="transparent" position="fixed">
        <Toolbar>
          <Typography variant="h6">Susquehanna Demo</Typography>
        </Toolbar>
      </AppBar>
      {selectionIds.map((id) => (
        <Box
          display="flex"
          style={{ justifyContent: "center" }}
          flexDirection="row"
          key={id}
        >
          <Grid selectionId={id} />
        </Box>
      ))}
    </>
  );
};
