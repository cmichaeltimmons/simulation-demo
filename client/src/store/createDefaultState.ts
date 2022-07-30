import { Category, categoryAdapter } from "./sliceCategories";
import { Cell } from "./sliceCells";
import { selectionAdapter } from "./sliceSelection";
import { cellsAdapter } from "./sliceCells";
import { categoryColors } from "../colors";
import { createId, createIds } from "../utils";
import { Selection } from "./sliceSelection";
import { pfIndexToPocket } from '../handMappings'

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
  const defaultCellIds = createIds(100);
  const selectedCategoryId = foldId;

  /**
   * categories default state
   */
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
  const heroCellsArray: Cell[] = defaultCellIds.map((id, index) => {
    return {
      currentCategoryId: selectedCategoryId,
      previousCategoryId: selectedCategoryId,
      id,
      selectionId: heroId,
      value: pfIndexToPocket[index],
    };
  });

  const villianCellsArray: Cell[] = defaultCellIds.map((id, index) => {
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
    cellIds: defaultCellIds,
    categoryIds: defaultCategoryIds,
    selectedCategoryId,
  };
  const villianSelection: Selection = {
    id: villianId,
    cellIds: defaultCellIds,
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
