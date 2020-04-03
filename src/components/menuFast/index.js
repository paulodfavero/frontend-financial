import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import {
  ExitToApp,
  Share,
  Print,
  Save,
  MoneyOffOutlined,
  Menu as MenuIcon
} from "@material-ui/icons";

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
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    dispatch({
      type: "OPEN_MENU",
      payload: {
        isOpened: true
      }
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={clsx(classes.speedDial, `${theme}`)}
        icon={<MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          key="Adicionar"
          icon={<MoneyOffOutlined />}
          tooltipTitle="Adicionar"
          tooltipOpen
          onClick={handleAdd}
        />
        <SpeedDialAction
          key="Logout"
          icon={<ExitToApp />}
          tooltipTitle="Logout"
          tooltipOpen
          onClick={handleClose}
        />
      </SpeedDial>
    </div>
  );
}

SpeedDialTooltipOpen.defaultProps = {
  theme: "gains"
};
SpeedDialTooltipOpen.propTypes = {
  theme: PropTypes.string
};
