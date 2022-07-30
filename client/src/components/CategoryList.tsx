import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { selectionSelectors } from "../store/sliceSelection";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CategoryListItem } from "./CategoryListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "250px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SwitchList = (props: { selectionId: string }) => {
  const classes = useStyles();
  const categoryIds = useSelector((state: RootState) => {
    return selectionSelectors.selectById(state, props.selectionId)!.categoryIds;
  });

  return (
    <List className={classes.root}>
      {categoryIds.map((id) => (
        <CategoryListItem key={id} selectionId={props.selectionId} categoryId={id} />
      ))}
    </List>
  );
};
