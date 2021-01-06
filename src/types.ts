export type Category<Data> = {
  id: string;
  selectionId: string;
  data: Data;
};

export type Cell<Data> = {
  previousCategoryId: string;
  currentCategoryId: string;
  data: Data;
};

export type Selection<Data> = {
  id: string;
  selectedCategoryId: string;
  data: Data;
};
