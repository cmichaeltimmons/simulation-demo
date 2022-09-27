import { categorySelectors } from "../store/sliceCategories";
import {
  selectionSelectors,
  updateSelectedCategory,
} from "../store/sliceSelection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Button } from "@mui/material";

type Props = {
  categoryId: string;
  selectionId: string;
};

export const CategoryListItem = (props: Props) => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => {
    return categorySelectors.selectById(state, props.categoryId)!;
  });
  const selection = useSelector((state: RootState) => {
    return selectionSelectors.selectById(state, props.selectionId)!;
  });
  const checked = category.id === selection.selectedCategoryId;
  const onChange = () => {
    dispatch(
      updateSelectedCategory({
        selectionId: props.selectionId,
        newCategoryId: category.id,
      })
    );
  };
  return (
    <Box
      component="span"
      color={category.fill}
      onClick={onChange}
      sx={{ p: 1, border: checked ? "1px dashed grey" : null }}
    >
      <Button style={{ color: category.fill }}>{category.name}</Button>
    </Box>
  );
};
