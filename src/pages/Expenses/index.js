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

export default function Expenses() {
  const classes = useStyles();
  const [expense, setExpense] = useState("");
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("expenses");
      setExpense(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={clsx(classes.wrap, `${isOpened && "active"}`)}>
        <Header origin="expense" title="Saldo atual em conta" value="509" />
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              {expense &&
                expense.map(item => (
                  <>
                    <CardComponent
                      key={item.id}
                      origin="expense"
                      name={item.nome}
                      category={item.categoria}
                      value={item.valor}
                      partials={item.parcelas}
                      startDate={item.data_inicio}
                      expensesTypes={item.tipo_despesa}
                      limitDate={item.vencimento}
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
      <FastMenu theme="expenses" />
      <SideComponent />
    </>
  );
}
