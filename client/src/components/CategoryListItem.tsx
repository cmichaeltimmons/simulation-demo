import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import { categorySelectors } from "../store/sliceCategories";
import {
  selectionSelectors,
  updateSelectedCategory,
} from "../store/sliceSelection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

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
    <ListItem>
      <ListItemIcon>
        <svg
          className="MuiSvgIcon-root"
          viewBox="0 0 200 200"
          width="40px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={category.fill}
            d="M56.7,-21.5C60.7,-6,42.4,13.6,23.9,25.3C5.3,37,-13.6,40.9,-26.7,32.4C-39.8,23.9,-47.1,3.1,-41.7,-14.3C-36.3,-31.6,-18.2,-45.6,4.1,-46.9C26.3,-48.3,52.7,-37,56.7,-21.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </ListItemIcon>
      <ListItemText primary={category.name} />
      <ListItemSecondaryAction>
        <Switch edge="end" onChange={onChange} checked={checked} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
