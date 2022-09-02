import { AppThunk } from "../store/store";
import { cellSelectors } from "../store/sliceCells";
import { scenarioSelectors, updateScenario } from "../store/sliceScenario";
import { selectionSelectors } from "../store/sliceSelection";
import {
  createRequest,
  requestComplete,
} from "../store/sliceSimulationRequest";
import { createId } from "../utils";

export const thunkSimulationRequest =
  (): AppThunk<void> => async (dispatch, getState) => {
    const state = getState();
    const { visibleScenarioId } = state.app;
    const visibleSimulation = scenarioSelectors.selectById(
      state,
      visibleScenarioId
    )!;
    const { heroSelectionId, villianSelectionId } = visibleSimulation;
    const heroSelection = selectionSelectors.selectById(
      state,
      heroSelectionId
    )!;
    const villianSelection = selectionSelectors.selectById(
      state,
      villianSelectionId
    )!;
    const heroCellIds = heroSelection.cellIds;
    const villianCellIds = villianSelection.cellIds;
    let heroString = "";
    let villianString = "";
    heroCellIds.forEach((id) => {
      const cell = cellSelectors.selectById(state, id)!;
      if (cell.currentCategoryId === heroSelection.selectedCategoryId) {
        heroString += cell.value + ",";
      }
    });
    villianCellIds.forEach((id) => {
      const cell = cellSelectors.selectById(state, id)!;
      if (cell.currentCategoryId === villianSelection.selectedCategoryId) {
        villianString += cell.value + ",";
      }
    });
    const requestId = createId();
    dispatch(
      updateScenario({
        id: visibleScenarioId,
        changes: { requestId: requestId },
      })
    );
    dispatch(
      createRequest({ id: requestId, hero: heroString, villian: villianString })
    );
    const response = await fetch("api/run-simulations", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hero: heroString,
        villian: villianString,
      }),
    });
    const json = await response.json();
    dispatch(
      requestComplete({ id: requestId, hero: json.hero, villian: json.villian })
    );
  };
