import React, { useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles, Button } from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

import { handleOpenMenu } from "../../lib/menuFast/menu-reducer";
import { expensesListUpdated } from "../../lib/expenses/expenses-reducer";
import { gainsListUpdated } from "../../lib/gains/gains-reducer";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: -20,
    right: theme.spacing(9),
    height: 350,
    transform: "translateZ(0px)",
    flexGrow: 1,
    display: "flex",
    alignItems: "flex-end",
    zIndex: 1,
    transition: "all .3s ease-out",
    "&.show": {
      bottom: theme.spacing(10)
    }
  },
  speedDial: {
    width: 50,
    minWidth: 50,
    height: 50,
    minHeight: 50,
    borderRadius: "50%",
    position: "absolute",
    color: "#ffffff",
    "&.expenses, &.expenses:hover": {
      backgroundColor: theme.palette.primaryExpenses.main
    },
    "&.gains, &.gains:hover": {
      backgroundColor: theme.palette.primaryGains.main
    }
  }
}));

export default function SpeedDialTooltipOpen({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(handleOpenMenu(true));
    dispatch(expensesListUpdated(false));
    dispatch(gainsListUpdated(false));
  };

  useEffect(() => {
    let whereScreen = 0;
    function listenToScroll() {
      const button = document.querySelector("#button");
      if (window.pageYOffset < whereScreen) {
        console.log(button, "menor");
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }

      whereScreen = window.pageYOffset;
    }
    window.addEventListener("scroll", listenToScroll);
  }, [window.pageYOffset]);

  return (
    <div className={clsx(classes.root, "show")} id="button">
      <Button
        className={clsx(classes.speedDial, `${page}`)}
        onClick={handleAdd}
      >
        <SpeedDialIcon />
      </Button>
    </div>
  );
}

SpeedDialTooltipOpen.defaultProps = {
  page: "gains"
};
SpeedDialTooltipOpen.propTypes = {
  page: PropTypes.string
};
