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

import { expensesTotal } from "../../lib/expenses/expenses-reducer";

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
  const dispatch = useDispatch();
  const [expense, setExpense] = useState();
  const [totalValue, setTotalValue] = useState("");
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));
  const expenseList = useSelector(state =>
    R.path(["expenses", "createdList"], state)
  );

  useEffect(() => {
    if (expenseList) {
      async function fetchData() {
        const res = await api.get("expenses");
        const listSort = R.sortWith([R.ascend(R.prop("limitDate"))]);
        const filtered = listSort(res.data.docs);

        if (res.data.total <= 1) {
          setTotalValue(res.data.docs[0].value);
        } else {
          let valorTotal = 0;
          filtered.map(item => {
            return (valorTotal += parseInt(item.value));
          });
          setTotalValue(valorTotal);
        }
        setExpense(filtered);
      }
      fetchData();
    }
  }, [expenseList]);

  useEffect(() => {
    if (totalValue) {
      dispatch(expensesTotal(totalValue));
    }
  }, [totalValue]);

  return (
    <>
      <div className={clsx(classes.wrap, `${isOpened && "active"}`)}>
        <Header origin="expense" title="Seu gasto, jovem" value={totalValue} />
        <Guide listCard={expense} />
        {!expense && <SkeletonCard />}
      </div>
      <FastMenu page="expenses" />
      <SideComponent page="expenses" />
    </>
  );
}
