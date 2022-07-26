import React, { useEffect, useRef } from "react";
import { RootState, useAppDispatch } from "../store/store";
import Selection, { SelectionEvent } from "@simonwep/selection-js";
import { backToPrevious } from "../store/sliceCells";
import { thunkNewCategory } from "../thunks/thunkNewCategory";
import { useSelector } from "react-redux";
import { SwitchList } from "./CategoryList";
import { Cell } from "./Cell";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Box, Theme, useTheme } from "@mui/material";

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      ".selection-area": "rgba(46, 115, 252, 0.11)",
    }}
  />
);

const makeStyles = (theme: Theme) => ({
  mainContainer: {
    paddingTop: "64px",
    height: "calc(100vh - 64px)",
    width: "100vw",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  selectionContainer: {
    display: "grid",
    gridTemplate: "repeat(13, 1fr) / repeat(13, 1fr)",
    margin: "auto",
    "& .boxes": {
      border: "2px solid transparent",
      transition: "all 0.3s",
      cursor: "pointer",
      textAlign: "center",
      lineHeight: "30px",
    },
  },
  sectionWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const Grid = (props: { selectionId: string }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { selectionId } = props;
  let selectionRef = useRef<Selection>();
  const dispatch = useAppDispatch();
  const cellIds = useSelector((state: RootState) => {
    return state.selections.entities[selectionId]!.cellIds;
  });

  /**
   *  create a selection ref when component is mounted
   *  then destroy it when it is unmounted
   */
  useEffect(() => {
    selectionRef.current = Selection.create({
      class: "selection-area",
      selectables: [`#${selectionId} > div`],
      boundaries: [`#${selectionId}`],
    }).on("move", ({ changed: { removed, added } }: SelectionEvent) => {
      removed.forEach((el) => dispatch(backToPrevious(el.id)));
      added.forEach((el) => dispatch(thunkNewCategory({ cellId: el.id })));
    });
    return () => {
      selectionRef.current?.destroy();
    };
  }, [selectionId, dispatch]);

  return (
    <div>
      {inputGlobalStyles}
      <Box sx={styles.sectionWrapper}>
        <Box id={props.selectionId} sx={styles.selectionContainer}>
          {cellIds.map((id) => (
            <Cell key={id} cellId={id} />
          ))}
        </Box>
      </Box>
      <Box sx={styles.sectionWrapper}>
        <SwitchList selectionId={selectionId}></SwitchList>
      </Box>
    </div>
  );
};
