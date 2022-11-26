import { AppThunk } from "../store/store";
import { newCategory } from "../store/sliceCells";

export const thunkNewCategory =
  (args: { cellId: string }): AppThunk<void> =>
  (dispatch, getState) => {
    const { cellId } = args;
    const state = getState();
    const cell = state.cells.entities[args.cellId]!;
    const selection = state.selections.entities[cell.selectionId]!;
    const { selectedCategoryId } = selection;
    dispatch(newCategory({ cellId, selectedCategoryId }));
  };
