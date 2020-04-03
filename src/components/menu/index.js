import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MoneyOffOutlinedIcon from "@material-ui/icons/MoneyOffOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [hide, setHide] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    if (path === "/") {
      setHide(true);
    }
  }, []);
  return (
    <>
      {!hide && (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            label="Expends"
            icon={<MoneyOffOutlinedIcon />}
            to="/expenses"
          />

          <BottomNavigationAction
            component={Link}
            label="Gains"
            icon={<AttachMoneyOutlinedIcon />}
            to="/gains"
          />
        </BottomNavigation>
      )}
    </>
  );
}
