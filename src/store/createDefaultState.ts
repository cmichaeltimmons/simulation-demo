import { Category, categoryAdapter } from "./sliceCategories";
import { Cell } from "./sliceCells";
import { selectionAdapter } from "./sliceSelection";
import { cellsAdapter } from "./sliceCells";
import { categoryColors } from "../colors";
import { createId, createIds } from "../utils";
import { Selection } from "./sliceSelection";

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
  const defaultCategoryIds = createIds(4);
  const defaultCellIds = createIds(100);
  const selectedCategoryId = defaultCategoryIds[0];

  /**
   * categories default state
   */
  const defaultCategoriesArray: Category[] = [
    {
      id: defaultCategoryIds[0],
      name: "Category One",
      fill: categoryColors[0],
    },
    {
      id: defaultCategoryIds[1],
      name: "Category Two",
      fill: categoryColors[1],
    },
    {
      id: defaultCategoryIds[2],
      name: "Category Four",
      fill: categoryColors[2],
    },
    {
      id: defaultCategoryIds[3],
      name: "Category Five",
      fill: categoryColors[3],
    },
  ];

  const defaultCategoryState = categoryAdapter.addMany(
    categoryInitialState,
    defaultCategoriesArray
  );

  /**
   * cells default state
   */
  const defaultCellsArray: Cell[] = defaultCellIds.map((id) => {
    return {
      currentCategoryId: selectedCategoryId,
      previousCategoryId: selectedCategoryId,
      id,
      selectionId: defaultSelectionId,
      num: Math.floor(Math.random() * 100),
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

  const defaultSelectionsState = selectionAdapter.addOne(
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
