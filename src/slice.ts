import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
// import { AppThunk, RootState } from "./store/store";
// import { createId } from "./utils";

// export type Category = {
//   id: string;
//   backGroundColor: string;
// };

// export type Cell = {
//   id: string;
//   previousCategoryId: string | null;
//   currentCategoryId: string | null;
//   selectionId: string;
// };

// export type Selection = {
//   id: string;
//   selectedCategoryId: string;
//   cellIds: string[];
//   categoryIds: string[];
// };

// const categoryAdapter = createEntityAdapter<Category>({});
// const selectionAdapter = createEntityAdapter<Selection>({});
// const cellAdapter = createEntityAdapter<Cell>({});

// export const slice = createSlice({
//   name: "selection",
//   initialState: {
//     categories: categoryAdapter.getInitialState(),
//     selections: selectionAdapter.getInitialState(),
//     cells: cellAdapter.getInitialState(),
//   },
//   reducers: {
//     addSelection: (state, action: PayloadAction<Selection>) => {
//       selectionAdapter.addOne(state.selections, action.payload);
//     },
//     addCells: (state, action: PayloadAction<Cell[]>) => {
//       cellAdapter.addMany(state.cells, action.payload);
//     },
//     addCategories: (state, action: PayloadAction<Category[]>) => {
//       categoryAdapter.addMany(state.categories, action.payload);
//     },
//   },
// });

// export const { addSelection, addCells, addCategories } = slice.actions;

// export const categorySelectors = categoryAdapter.getSelectors<RootState>(
//   (state) => state.selection.categories
// );

// export const selectionSelectors = selectionAdapter.getSelectors<RootState>(
//   (state) => state.selection.selections
// );

// export const thunkCreateCategories = (args: {
//   categories: Omit<Category, "id">[];
// }): AppThunk<string[]> => (dispatch) => {
//   const ids: string[] = [];
//   const categories = args.categories.map((c, index) => {
//     const id = createId();
//     ids.push(id);
//     return {
//       id,
//       ...c,
//     };
//   });
//   dispatch(addCategories(categories));
//   return ids;
// };

// export const thunkCreateCells = (args: {
//   selectionId: string;
//   num: number;
// }): AppThunk<string[]> => (dispatch) => {
//   const ids: string[] = [];
//   const cells: Cell[] = Array.from({ length: args.num }).map(() => {
//     const id = createId();
//     ids.push(id);
//     return {
//       id,
//       currentCategoryId: "",
//       previousCategoryId: "",
//       selectionId: args.selectionId,
//     };
//   });
//   dispatch(addCells(cells));
//   return ids;
// };

// export const thunkCreateSelection = (args: {
//   selectedCategoryId: string;
//   categoryIds?: string[];
// }): AppThunk<string> => (dispatch) => {
//   const { selectedCategoryId } = args;
//   const id = createId();
//   const selection: Selection = {
//     selectedCategoryId,
//     categoryIds: args.categoryIds || [],
//     id,
//     cellIds: [],
//   };
//   dispatch(slice.actions.addSelection(selection));
//   return id;
// };
// addCategories: {
//   reducer: (state: RootState) => {
//     categoryAdapter.addMany(state.saddCategories: {
//   reducer: (state: RootState) => {
//     categoryAdapter.addMany(state.selection.categories, action.payload);
//   },
//   prepare: (args: {
//     categoriesData: CategoryData[];
//     selectionId: string;
//   }) => {
//     const { categoriesData, selectionId } = args;
//     const categories: Category<CategoryData>[] = [];
//     categoriesData.forEach((c) =>
//       categories.push({
//         id: "a" + nanoid(),
//         data: c,
//         selectionId,
//       })
//     );
//     return { payload: categories };
//   }election.categories, action.payload);
//   },
//   prepare: (args: {
//     categoriesData: CategoryData[];
//     selectionId: string;
//   }) => {
//     const { categoriesData, selectionId } = args;
//     const categories: Category<CategoryData>[] = [];
//     categoriesData.forEach((c) =>
//       categories.push({
//         id: "a" + nanoid(),
//         data: c,
//         selectionId,
//       })
//     );
//     return { payload: categories };
//   },
//}
/** 
addSelection: (
  state: State,
  action: PayloadAction<Selection<SelectionData>>
) => {
  selectionAdapter.addOne(state.selections, action.payload);
},
updateSelection: (
  state: State,
  action: PayloadAction<Update<Selection<SelectionData>>>
) => {
  selectionAdapter.updateOne(state.selections, action.payload);
},
addCells: (state: State, action: PayloadAction<Cell<CellData>[]>) => {
  cellsAdapter.addMany(state.cells, action.payload);
}
*/
