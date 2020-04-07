import React, { useState, useEffect } from "react";
import * as R from "ramda";
import clsx from "clsx";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

import api from "../../services/api";
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
  }
}));

export default function Gains() {
  const classes = useStyles();
  const [gains, setGains] = useState();
  const [totalValue, setTotalValue] = useState("");
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));

  useEffect(() => {
    // let dataFom = moment(new Date("2020", "3", "25"))
    //   .locale("pt-br")
    //   .format("dddd, ll");
    // // console.log(dataFom);
    async function fetchData() {
      const res = await api.get("gains");

      if (res.data.total <= 1) {
        setTotalValue(res.data.docs[0].value);
      } else {
        let valorTotal = 0;
        res.data.docs.map(item => {
          return (valorTotal += parseInt(item.value));
        });
        setTotalValue(valorTotal);
      }
      setGains(res.data.docs);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className={clsx(classes.wrap, `${isOpened && "active"}`)}>
        <Header
          origin="gain"
          title="Valor total a receber"
          value={totalValue}
        />
        <Guide listCard={gains} />

        {!gains && <SkeletonCard />}
      </div>
      <FastMenu theme="gains" />
      <SideComponent />
    </>
  );
}
