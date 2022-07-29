import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectors as cellSelectors } from "../store/sliceCells";
import { selectors as categorySelectors } from "../store/sliceCategories";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cell: (props: { backgroundColor: string }) => {
    return {
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
      backgroundColor: props.backgroundColor,
    };
  },
}));

export const Cell = (props: { cellId: string }) => {
  const { cellId } = props;
  const cell = useSelector((state: RootState) => {
    return cellSelectors.selectById(state, cellId)!;
  });
  const category = useSelector((state: RootState) => {
    return categorySelectors.selectById(state, cell.currentCategoryId)!;
  });
  const classes = useStyles({ backgroundColor: category.fill });
  return (
    <div id={cellId} className={classes.cell}>
      {cell.value}
    </div>
  );
};
