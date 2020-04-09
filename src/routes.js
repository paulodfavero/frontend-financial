import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CssBaseline } from "@material-ui/core";
import Theme from "./styles/theme";
import "./styles/style.css";

import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import Gains from "./pages/Gains";
import Result from "./pages/Result";
import Menu from "./components/menu";

import { expensesTotal, expensesList } from "./lib/expenses/expenses-reducer";
import {
  expensesGet,
  expensesTotalValue
} from "./lib/expenses/expenses-selector";

import { gainsTotal, gainsList } from "./lib/gains/gains-reducer";
import { gainsGet, gainsTotalValue } from "./lib/gains/gains-selector";

export default function Routes() {
  const dispatch = useDispatch();

  const getExpensesList = async () => {
    try {
      const res = await expensesGet();
      dispatch(expensesList(res));
      dispatch(expensesTotal(expensesTotalValue(res)));
    } catch (error) {
      console.log("ERROR TO GET EXPENSES LIST", error);
    }
  };

  const getGainsList = async () => {
    try {
      const res = await gainsGet();
      dispatch(gainsList(res));
      dispatch(gainsTotal(gainsTotalValue(res)));
    } catch (error) {
      console.log("ERROR TO GET GAINS LIST", error);
    }
  };

  getExpensesList();
  getGainsList();

  return (
    <>
      <CssBaseline />
      <Theme>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/gains" component={Gains} />
            <Route path="/result" component={Result} />
          </Switch>

          <Menu />
        </BrowserRouter>
      </Theme>
    </>
  );
}
