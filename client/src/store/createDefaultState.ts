import { Category, categoryAdapter } from "./sliceCategories";
import { Cell } from "./sliceCells";
import { selectionAdapter } from "./sliceSelection";
import { cellsAdapter } from "./sliceCells";
import { createId, createIds } from "../utils";
import { Selection } from "./sliceSelection";
import { pfIndexToPocket } from '../utils/handMappings'

export const createDefaultState = () => {
  /**
   * initial states
   */
  const cellsInitialState = cellsAdapter.getInitialState();
  const selectionInitialState = selectionAdapter.getInitialState();
  const categoryInitialState = categoryAdapter.getInitialState();

  /**
   * default ids
   */
  const heroId = createId();
  const villianId = createId();
  const foldId = createId();
  const callId = createId();
  const raiseId = createId();
  const defaultCategoryIds = [
    foldId,
    callId,
    raiseId
  ]
  const heroCellIds = createIds(169);
  const villianCellIds = createIds(169);
  const selectedCategoryId = foldId;

  /**
   * categories default state
   */

   const categoryColors = [
    "#00bbf9",
    "#F15BB5",
    "#9B5DE5",
    "#00F5D4",
    "#00BBF9",
  ];

  const defaultCategoriesArray: Category[] = [
    {
      id: foldId,
      name: "Fold",
      fill: categoryColors[0],
    },
    {
      id: callId,
      name: "Call",
      fill: categoryColors[3],
    },
    {
      id: raiseId,
      name: "Raise",
      fill: categoryColors[1],
    },
  ];

  const defaultCategoryState = categoryAdapter.addMany(
    categoryInitialState,
    defaultCategoriesArray
  );

  /**
   * cells default state
   */
  const heroCellsArray: Cell[] = heroCellIds.map((id, index) => {
    return {
      currentCategoryId: selectedCategoryId,
      previousCategoryId: selectedCategoryId,
      id,
      selectionId: heroId,
      value: pfIndexToPocket[index],
    };
  });

  const villianCellsArray: Cell[] = villianCellIds.map((id, index) => {
    return {
      currentCategoryId: selectedCategoryId,
      previousCategoryId: selectedCategoryId,
      id,
      selectionId: villianId,
      value: pfIndexToPocket[index],
    };
  });

  let defaultCells = cellsAdapter.addMany(
    cellsInitialState,
    heroCellsArray
  );

  defaultCells = cellsAdapter.addMany(
    defaultCells,
    villianCellsArray
  );

  /**
   * selection default state
   */
  const heroSelection: Selection = {
    id: heroId,
    cellIds: heroCellIds,
    categoryIds: defaultCategoryIds,
    selectedCategoryId,
  };
  
  const villianSelection: Selection = {
    id: villianId,
    cellIds: villianCellIds,
    categoryIds: defaultCategoryIds,
    selectedCategoryId,
  };

  let defaultSelectionsState = selectionAdapter.addMany(
    selectionInitialState,
    [heroSelection, villianSelection]
  );

  const defaultState = {
    categories: defaultCategoryState,
    cells: defaultCells,
    selections: defaultSelectionsState,
  };

  return defaultState;
};
