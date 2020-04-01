import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%)`
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography variant="h1" className={classes.title}>
        Teste
      </Typography>
      <Typography variant="body1">Teste</Typography>
      <Typography variant="body2">Teste</Typography>
    </div>
  );
}
