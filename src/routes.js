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

import api from "./services/api";

import { expensesTotal, expensesList } from "./lib/expenses/expenses-reducer";
import {
  expensesListOrder,
  expensesTotalValue
} from "./lib/expenses/expenses-selector";

import { gainsTotal } from "./lib/gains/gains-reducer";
import { gainsTotalValue } from "./lib/gains/gains-selector";

export default function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/expenses");
      dispatch(expensesList(expensesListOrder(res.data.docs)));
      dispatch(expensesTotal(expensesTotalValue(res.data.docs)));
      const resGains = await api.get("/gains");
      dispatch(gainsTotal(gainsTotalValue(resGains.data.docs)));
    }
    fetchData();
  }, []);

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
