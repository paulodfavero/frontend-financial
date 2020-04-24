import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  makeStyles,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import {
  expensesTotalValue,
  expensesListOrderType
} from "../../lib/expenses/expenses-selector";
import {
  expensesTotal,
  expensesList
} from "../../lib/expenses/expenses-reducer";
import {
  gainsTotalValue,
  gainsListOrderType
} from "../../lib/gains/gains-selector";
import { gainsTotal, gainsList } from "../../lib/gains/gains-reducer";

import { FormatNumber } from "../../utils/formaterNumber";

const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%)`,
    textAlign: "center",
    color: "#ffffff",
    height: "22vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "&.expenses": {
      background: `linear-gradient(0deg, #d43030 0%, #f34949 50%)`
    },
    "&.result": {
      background: `linear-gradient(0deg, #008775 0%, #0bad97 50%)`
    }
  },
  menu: {
    position: "absolute",
    top: 0,
    right: 0
  }
}));

export default function Header({ title, value, origin }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (type, origin) => {
    setAnchorEl(null);

    if (origin !== "backdropClick") {
      if (origin === "gains") {
        const listOrdered = await gainsListOrderType(type);
        dispatch(gainsList(listOrdered));
        dispatch(gainsTotal(gainsTotalValue(listOrdered)));
      } else {
        const listOrdered = await expensesListOrderType(type);
        dispatch(expensesList(listOrdered));
        dispatch(expensesTotal(expensesTotalValue(listOrdered)));
      }
    }
  };

  return (
    <div className={clsx(classes.header, `${origin}`)}>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="h1" className={classes.title}>
        {value ? FormatNumber(value) : "..."}
      </Typography>
      <div className={classes.menu}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon style={{ color: "#ffffff" }} />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "20ch"
            }
          }}
        >
          <MenuItem onClick={() => handleClose("Fixa", origin)}>
            {origin === "expenses" ? "Despesa " : "Receita "} Fixa
          </MenuItem>
          <MenuItem onClick={() => handleClose("Variável", origin)}>
            {origin === "expenses" ? "Despesa " : "Receita "} Variável
          </MenuItem>
          <MenuItem onClick={() => handleClose("todos", origin)}>
            Todas
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

Header.propTypes = {
  origin: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
