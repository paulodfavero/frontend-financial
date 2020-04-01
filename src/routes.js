import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import Login from "./pages/Login";
import Category from "./pages/Category";

export default function Routes() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/categoria" component={Category} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
