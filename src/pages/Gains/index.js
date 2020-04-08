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

import { gainsTotal } from "../../lib/gains/gains-reducer";

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
  const dispatch = useDispatch();
  const [gains, setGains] = useState();
  const [totalValue, setTotalValue] = useState("");
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));
  const gainsList = useSelector(state =>
    R.path(["gains", "createdList"], state)
  );

  useEffect(() => {
    if (gainsList) {
      async function fetchData() {
        const res = await api.get("gains");

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
        setGains(filtered);
      }

      fetchData();
    }
  }, [gainsList]);

  useEffect(() => {
    if (totalValue) {
      dispatch(gainsTotal(totalValue));
    }
  }, [totalValue]);

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
      <FastMenu page="gains" />
      <SideComponent page="gains" />
    </>
  );
}
