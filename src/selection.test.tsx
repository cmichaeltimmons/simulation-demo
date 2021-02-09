import React from "react";
import { Demo } from "./Demo";
import { render, screen } from "./tests-utils";

it("should load initial state", () => {
  render(<Demo />);
});

// it("should create cells", () => {
//   const store = createStore();
//   const state = store.getState();
//   type State = typeof state;
//   const cellData: CellData[] = [{ num: 1 }, { num: 2 }, { num: 3 }];
//   const selectionId = "selectionId";
//   const previousCategoryId = "prevCatId";
//   const currentCategoryId = "currentCatId";
//   store.dispatch(
// //     addCells({ cellData, sconst categoryIds = dispatch(
//       thunkCreateCategories({
//         categories: [
//           { backGroundColor: "blue" },
//           { backGroundColor: "red" },
//           { backGroundColor: "green" },
//         ],
//       })
//     );electionId, previousCategoryId, currentCategoryId })
//   );
//   const newState = store.getState();
//   expect(newState.selection.cells.ids.length).toEqual(3);
//   const cellOneId = newState.selection.cells.ids[0];
//   newState.selection.cells.entities[cellOneId];
// });

// it("should create categories", () => {
//     const store = createStore();
//     const state = store.getState();
//     type State = typeof state;
//     const categoriesData: CategoryData[] = [{ cdata: "d" }];
//     const selectionId = "selectionId";
//     const previousCategoryId = "prevCatId";
//     const currentCategoryId = "currentCatId";
//     store.dispatch(addCategories({ categoriesData, selectionId: "adf" }));
//     const newState = store.getState();
//     const entities = newState.selection.categories.entities;
//     const entity = Object.values(entities)[0]!;
//     expect(entity.selectionId).toEqual("adf");
//   });
