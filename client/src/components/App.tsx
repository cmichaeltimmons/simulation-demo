import { useDispatch } from "react-redux";
import { Alert, Button, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Grid } from "../components/Grid";
import { scenarioSelectors } from "../store/sliceScenario";
import { simulationSelectors } from "../store/sliceSimulationRequest";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { thunkSimulationRequest } from "../thunks/thunkSimulationRequest";
import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

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
}));

const round = (n: number) => Math.round((n + Number.EPSILON) * 1000) / 1000;

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
  const simulationRequest = useSelector(
    (state: RootState) =>
      simulationSelectors.selectById(state, scenario.requestId!)!
  );
  const [snackbarClosed, setSnackbarClosed] = useState(false);
  const onAnalyzeClick = () => {
    setSnackbarClosed(false);
    dispatch(thunkSimulationRequest());
  };

  return (
    <>
      <AppBar color="transparent" position="fixed">
        <Toolbar>
          <Typography variant="h6"> Demo</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button onClick={onAnalyzeClick}>Analyze</Button>
        </Toolbar>
        {simulationRequest && simulationRequest.inProcess && <LinearProgress />}
      </AppBar>
      <div className={classes.mainContainer}>
        <Box
          display="flex"
          style={{ justifyContent: "center" }}
          flexDirection="row"
          key={scenario.villianSelectionId}
        >
          <div>
            <Typography variant="h6" align="center">
              Hero
            </Typography>
            <Grid selectionId={scenario.heroSelectionId} />
          </div>
        </Box>
        <Box
          display="flex"
          style={{ justifyContent: "center" }}
          flexDirection="row"
          key={scenario.heroSelectionId}
        >
          <div>
            <Typography variant="h6" align="center">
              Villian
            </Typography>
            <Grid selectionId={scenario.villianSelectionId} />
          </div>
        </Box>
        {simulationRequest && simulationRequest.complete && (
          <Snackbar open={!snackbarClosed} autoHideDuration={6000}>
            <Alert
              onClose={() => setSnackbarClosed(true)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Hero's {simulationRequest.heroCategory.name} range has{" "}
              {" " + round(simulationRequest.response!.hero)} equity vs
              Villian's {simulationRequest.villianCategory.name} range with
              {" " + round(simulationRequest.response!.villian) + " "}equity
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
};
