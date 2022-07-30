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
  const defaultSelectionId = createId();
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
  const defaultCellsArray: Cell[] = defaultCellIds.map((id, index) => {
    return {
      currentCategoryId: selectedCategoryId,
      previousCategoryId: selectedCategoryId,
      id,
      selectionId: defaultSelectionId,
      value: pfIndexToPocket[index],
    };
  });

  const defaultCells = cellsAdapter.addMany(
    cellsInitialState,
    defaultCellsArray
  );

  /**
   * selection default state
   */
  const defaultSelection: Selection = {
    id: defaultSelectionId,
    cellIds: defaultCellIds,
    categoryIds: defaultCategoryIds,
    selectedCategoryId,
  };

  let defaultSelectionsState = selectionAdapter.addOne(
    selectionInitialState,
    defaultSelection
  );

  const defaultState = {
    categories: defaultCategoryState,
    cells: defaultCells,
    selections: defaultSelectionsState,
  };

  return defaultState;
};
