import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Typography } from "@material-ui/core";

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
    "&.expense": {
      background: `linear-gradient(0deg, #d43030 0%, #f34949 50%)`
    },
    "&.result": {
      background: `linear-gradient(0deg, #008775 0%, #0bad97 50%)`
    }
  }
}));

export default function Header({ title, value, origin }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.header, `${origin}`)}>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="h1" className={classes.title}>
        {FormatNumber(value)}
      </Typography>
    </div>
  );
}

Header.propTypes = {
  origin: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
