import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

import { handleOpenMenu } from "../../lib/menuFast/menu-reducer";
import { expensesListUpdated } from "../../lib/expenseList/expense-reducer";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(9),
    height: 350,
    transform: "translateZ(0px)",
    flexGrow: 1,
    display: "flex",
    alignItems: "flex-end",
    zIndex: 1
  },
  speedDial: {
    position: "absolute",
    "&.expenses > button, &.expenses > button:hover": {
      backgroundColor: theme.palette.primaryExpenses.main
    },
    "&.gains > button, &.gains > button:hover": {
      backgroundColor: theme.palette.primaryGains.main
    }
  }
}));

export default function SpeedDialTooltipOpen({ theme }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(handleOpenMenu(true));
    dispatch(expensesListUpdated(false));
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={clsx(classes.speedDial, `${theme}`)}
        icon={<SpeedDialIcon />}
        onClick={handleAdd}
      />
    </div>
  );
}

SpeedDialTooltipOpen.defaultProps = {
  theme: "gains"
};
SpeedDialTooltipOpen.propTypes = {
  theme: PropTypes.string
};
