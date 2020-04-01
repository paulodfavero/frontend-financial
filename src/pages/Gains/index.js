import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";

import api from "../../services/api";
import Header from "../../components/header";
import Card from "../../components/card";

export default function Login() {
  const [expense, setExpense] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("gains");
      setExpense(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Header origin="gain" title="Saldo atual em conta" value="509" />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {expense &&
              expense.map(item => (
                <Card
                  origin="gain"
                  name={item.nome}
                  value={item.valor}
                  payer={item.sacado}
                  installments={item.parcelas}
                  limitDate={item.data}
                  logo={item.logo}
                />
              ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
