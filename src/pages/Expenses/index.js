import React, { useState, useEffect } from "react";
import * as R from "ramda";
import clsx from "clsx";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";

import api from "../../services/api";
import { expensesListUpdated } from "../../lib/expenseList/expense-reducer";

import Header from "../../components/header";
import FastMenu from "../../components/menuFast";
import SideComponent from "../../components/sideComponent";
import Guide from "../../components/guide";
import SkeletonCard from "../../components/card/skeleton";

const useStyles = makeStyles(theme => ({
  wrap: {
    overflowY: "auto",
    transition: "all .4s ease",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1",
    width: "100vw",
    height: "100vh",
    transform: "translateX(0vw)",
    paddingBottom: 60,
    "&.active": {
      transform: "translateX(-100vw)"
    }
  },
  container: {
    marginTop: -50
  }
}));

export default function Expenses() {
  const classes = useStyles();
  const [expense, setExpense] = useState();
  const [totalValue, setTotalValue] = useState("");
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));
  const expenseList = useSelector(state =>
    R.path(["expensesListUpdated", "createdList"], state)
  );

  useEffect(() => {
    console.log(expenseList);
    if (expenseList) {
      async function fetchData() {
        const res = await api.get("expenses");

        if (res.data.total <= 1) {
          setTotalValue(res.data.docs[0].value);
        } else {
          let valorTotal = 0;
          res.data.docs.map(item => {
            return (valorTotal += parseInt(item.value));
          });
          setTotalValue(valorTotal);
        }
        setExpense(res.data.docs);
      }
      fetchData();
    }
  }, [expenseList]);

  return (
    <>
      <div className={clsx(classes.wrap, `${isOpened && "active"}`)}>
        <Header
          origin="expense"
          title="Saldo atual em conta"
          value={totalValue}
        />
        <Guide listCard={expense} />
        {!expense && <SkeletonCard />}
      </div>
      <FastMenu theme="expenses" />
      <SideComponent />
    </>
  );
}
