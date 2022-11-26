import { AppThunk } from "../store/store";
import { cellSelectors } from "../store/sliceCells";
import { scenarioSelectors, updateScenario } from "../store/sliceScenario";
import { selectionSelectors } from "../store/sliceSelection";
import {
  createRequest,
  requestComplete,
} from "../store/sliceSimulationRequest";
import { createId } from "../utils";
import { categorySelectors } from "../store/sliceCategories";
import ComlinkAPI, { api } from "../workers/ComlinkAPI.worker";
import { wrap } from "comlink";
const myComlinkWorkerInstance: Worker = new ComlinkAPI();
const myComlinkWorkerApi = wrap<typeof api>(myComlinkWorkerInstance);

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
    const heroCategory = categorySelectors.selectById(
      state,
      heroSelection.selectedCategoryId
    )!;
    const villianCategory = categorySelectors.selectById(
      state,
      villianSelection.selectedCategoryId
    )!;
    const requestId = createId();
    dispatch(
      updateScenario({
        id: visibleScenarioId,
        changes: { requestId: requestId },
      })
    );
    dispatch(
      createRequest({
        id: requestId,
        hero: heroString,
        villian: villianString,
        heroCategory: heroCategory,
        villianCategory: villianCategory,
      })
    );
    const response = await myComlinkWorkerApi.calculateEquity(
      heroString,
      villianString
    );
    dispatch(
      requestComplete({ id: requestId, hero: response, villian: 1 - response })
    );
  };
