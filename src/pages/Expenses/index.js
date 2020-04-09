import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";

import api from "../../services/api";

import Header from "../../components/header";
import FastMenu from "../../components/menuFast";
import SideComponent from "../../components/sideComponent";
import Guide from "../../components/guide";
import SkeletonCard from "../../components/card/skeleton";

import {
  expensesListSelector,
  expensesTotalSelector
} from "../../lib/expenses/expenses-selector";

const useStyles = makeStyles(theme => ({
  wrap: {
    overflowY: "auto",
    transition: "all .4s ease",
    zIndex: "1",
    width: "100vw",
    transform: "translateX(0vw)",
    paddingBottom: 60,
    "&.active": {
      transform: "translateX(-100vw)"
    }
  }
}));

export default function Expenses() {
  const classes = useStyles();
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));
  const expensesGet = useSelector(state => expensesListSelector(state));
  const expensesTotal = useSelector(state => expensesTotalSelector(state));

  return (
    <>
      <div className={clsx(classes.wrap, `${isOpened && "active"}`)}>
        <Header
          origin="expense"
          title="Seu gasto, jovem"
          value={expensesTotal}
        />
        <Guide listCard={expensesGet} />
        {!expensesGet && <SkeletonCard />}
      </div>
      <FastMenu page="expenses" />
      <SideComponent page="expenses" />
    </>
  );
}
