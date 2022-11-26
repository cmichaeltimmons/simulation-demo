import List from "@mui/material/List";
import { selectionSelectors } from "../store/sliceSelection";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CategoryListItem } from "./CategoryListItem";

const styles = {
  main: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
};

export const SwitchList = (props: { selectionId: string }) => {
  const categoryIds = useSelector((state: RootState) => {
    return selectionSelectors.selectById(state, props.selectionId)!.categoryIds;
  });
  return (
    <List sx={styles.main}>
      {categoryIds.map((id) => (
        <CategoryListItem
          key={id}
          selectionId={props.selectionId}
          categoryId={id}
        />
      ))}
    </List>
  );
};
