import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as R from "ramda";
import { makeStyles, Typography, Card, CardContent } from "@material-ui/core";

import {
  expensesTotalSelector,
  expensesMonthActive
} from "../../lib/expenses/expenses-selector";
import {
  gainsListSelector,
  gainsTotalSelector,
  gainsMonthActive
} from "../../lib/gains/gains-selector";

import Header from "../../components/header";
import Guide from "../../components/guide";
import SkeletonCard from "../../components/card/skeleton";

const useStyles = makeStyles(theme => ({
  wrap: {
    overflowY: "auto",
    transition: "all .4s ease",
    zIndex: "1",
    width: "100vw",
    transform: "translateX(0vw)",
    paddingBottom: 60
  }
}));

export default function Login() {
  const classes = useStyles();

  const gainsMonthGet = useSelector(state => gainsMonthActive(state));
  const gainsTotal = useSelector(state =>
    gainsTotalSelector(state, gainsMonthGet)
  );

  const expensesMonthGet = useSelector(state => expensesMonthActive(state));
  const expensesTotal = useSelector(state =>
    expensesTotalSelector(state, expensesMonthGet)
  );

  return (
    <>
      <div className={classes.wrap}>
        <Header
          origin="result"
          title="Quanto vai sobrar"
          value={gainsTotal - expensesTotal}
        />
        <Guide />
        {/* {!expensesGet && <SkeletonCard />} */}
      </div>
    </>
  );
}
