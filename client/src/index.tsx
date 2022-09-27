import React from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { Button, CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Grid } from "./components/Grid";
import { scenarioSelectors } from "./store/sliceScenario";
import {
  AppBar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { thunkSimulationRequest } from "./thunks/thunkSimulationRequest";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: "128px",
    height: "calc(80vh - 64px)",
    width: "100vw",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  controlPanel: {
    height: "calc(20vh - 64px)",
    width: "100vw",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const visibleScenarioId = useSelector(
    (state: RootState) => state.app.visibleScenarioId
  );
  const scenario = useSelector(
    (state: RootState) =>
      scenarioSelectors.selectById(state, visibleScenarioId)!
  );
  return (
    <>
      <AppBar color="transparent" position="fixed">
        <Toolbar>
          <Typography variant="h6">Susquehanna Demo</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContainer}>
        <Box
          display="flex"
          style={{ justifyContent: "center" }}
          flexDirection="row"
          key={scenario.villianSelectionId}
        >
          <Grid selectionId={scenario.villianSelectionId} />
        </Box>
        <Box
          display="flex"
          style={{ justifyContent: "center" }}
          flexDirection="row"
          key={scenario.heroSelectionId}
        >
          <Grid selectionId={scenario.heroSelectionId} />
        </Box>
      </div>
      <div className={classes.controlPanel}>
        <Button onClick={() => dispatch(thunkSimulationRequest())}>
          Analyze
        </Button>
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
