import React from "react";
import { useSelector } from "react-redux";
import * as R from "ramda";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";

import Header from "../../components/header";
import FastMenu from "../../components/menuFast";
import SideComponent from "../../components/sideComponent";
import Guide from "../../components/guide";
import SkeletonCard from "../../components/card/skeleton";

import {
  gainsListSelector,
  gainsTotalSelector,
  gainsMonthActive
} from "../../lib/gains/gains-selector";

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

export default function Gains() {
  const classes = useStyles();
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));
  const gainsGet = useSelector(state => gainsListSelector(state));
  const gainsMonthGet = useSelector(state => gainsMonthActive(state));

  const gainsTotal = useSelector(state =>
    gainsTotalSelector(state, gainsMonthGet)
  );

  return (
    <>
      <div className={clsx(classes.wrap, `${isOpened && "active"}`)}>
        <Header
          origin="gain"
          title="Valor total a receber"
          value={gainsTotal}
        />
        {gainsGet && <Guide listCard={gainsGet} origin="gains" />}

        {!gainsGet && <SkeletonCard />}
      </div>
      <FastMenu page="gains" />
      <SideComponent page="gains" />
    </>
  );
}
