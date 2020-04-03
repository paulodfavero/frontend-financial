import React from "react";
import * as R from "ramda";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  side: {
    transform: "translateX(100vw)",
    transition: "all .4s ease",
    background: "#fafafa",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1",
    width: "100vw",
    height: "100vh",
    overflowY: "auto",
    "&.active": {
      transform: "translateX(0vw)"
    }
  },
  back: {
    fontSize: 30,
    margin: theme.spacing(3)
  }
}));
export default function SideComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));

  const handleBack = () => {
    dispatch({
      type: "OPEN_MENU",
      payload: {
        isOpened: false
      }
    });
  };

  return (
    <div className={clsx(classes.side, `${isOpened && "active"}`)}>
      <ArrowBackTwoTone className={classes.back} onClick={handleBack} />
    </div>
  );
}
