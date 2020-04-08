import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as R from "ramda";
import { makeStyles, Typography, Card, CardContent } from "@material-ui/core";

import Header from "../../components/header";

const useStyles = makeStyles(theme => ({
  wrap: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
    textAlign: "center",
    flex: 1,
    justifyContent: "center"
  }
}));

export default function Login() {
  const classes = useStyles();
  const [result, setResult] = useState(0);
  const totalExpense = useSelector(state =>
    R.path(["expenses", "value"], state)
  );
  const totalGains = useSelector(state => R.path(["gains", "value"], state));

  useEffect(() => {
    setResult(totalGains - totalExpense);
  }, [totalGains, totalExpense]);

  return (
    <>
      <Header origin="result" title="Quanto vai sobrar" value={result} />
      <div className={classes.wrap}>
        <Card>
          <CardContent>
            <Typography variant="h1">Teste</Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
