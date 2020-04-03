import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";
import Theme from "./styles/theme";
import "./styles/style.css";

import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import Gains from "./pages/Gains";
import Menu from "./components/menu";

export default function Routes() {
  return (
    <>
      <CssBaseline />
      <Theme>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/gains" component={Gains} />
          </Switch>

          <Menu />
        </BrowserRouter>
      </Theme>
    </>
  );
}
