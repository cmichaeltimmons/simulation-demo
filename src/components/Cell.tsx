import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { cellSelectors } from "../store/sliceCells";
import { categorySelectors } from "../store/sliceCategories";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Cell = (props: { cellId: string }) => {
  const { cellId } = props;
  const theme = useTheme();
  const cell = useSelector((state: RootState) => {
    return cellSelectors.selectById(state, cellId)!;
  });
  const category = useSelector((state: RootState) => {
    return categorySelectors.selectById(state, cell.currentCategoryId)!;
  });
  return (
    <Box
      id={cellId}
      component="div"
      sx={{
        height: "2em",
        width: "2em",
        margin: "0.2em",
        border: "2px solid transparent",
        borderRadius: "0.15em",
        transition: "all 0.3s",
        cursor: "pointer",
        textAlign: "center",
        lineHeight: "30px",
        color: theme.palette.primary.contrastText,
        backgroundColor: category.fill,
      }}
    >
      {cell.value}
    </Box>
  );
};
