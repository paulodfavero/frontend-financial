import React from "react";
import { makeStyles, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  contentForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
    height: "100vh"
  }
}));

export default function Login() {
  const classes = useStyles();

  return (
    <>
      <form className={classes.contentForm}>
        <Typography variant="h3">Insira seu login e senha</Typography>
        <TextField label="Login" variant="outlined" />
        <TextField
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button variant="contained" color="secondary">
          Logar
        </Button>
      </form>
    </>
  );
}
