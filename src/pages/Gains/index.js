import React, { useState, useEffect } from "react";
import * as R from "ramda";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { makeStyles, Container, Grid } from "@material-ui/core";

import api from "../../services/api";
import Header from "../../components/header";
import CardComponent from "../../components/card";
import SkeletonCard from "../../components/card/skeleton";
import FastMenu from "../../components/menuFast";
import SideComponent from "../../components/sideComponent";

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
    "&.active": {
      transform: "translateX(-100vw)"
    }
  },
  container: {
    marginTop: -50
  }
}));

export default function Gains() {
  const classes = useStyles();
  const [expense, setExpense] = useState("");
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("gains");
      setExpense(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={clsx(classes.wrap, `${isOpened && "active"}`)}>
        <Header origin="gain" title="Saldo atual em conta" value="509" />
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              {expense &&
                expense.map(item => (
                  <>
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                    <CardComponent
                      origin="gain"
                      name={item.nome}
                      value={item.valor}
                      payer={item.sacado}
                      installments={item.parcelas}
                      limitDate={item.data}
                      logo={item.logo}
                    />
                  </>
                ))}
              {!expense && (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
      <FastMenu theme="gains" />
      <SideComponent />
    </>
  );
}
