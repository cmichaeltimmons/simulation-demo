import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Grid } from "./components/Grid";
import { selectors } from "./store/sliceSelection";
import { AppBar, Box, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: "64px",
    height: "calc(100vh - 64px)",
    width: "100vw",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  }
}));

export const Demo = () => {
  const classes = useStyles()
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
      <div className={classes.mainContainer}>
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
      </div>
    </>
  );
};
