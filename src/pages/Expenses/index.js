import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";

import api from "../../services/api";
import Header from "../../components/header";
import Card from "../../components/card";

export default function Login() {
  const [expense, setExpense] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("expenses");
      setExpense(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Header origin="expense" title="Saldo atual em conta" value="509" />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {expense &&
              expense.map(item => (
                <Card
                  origin="expense"
                  name={item.nome}
                  category={item.categoria}
                  value={item.valor}
                  partials={item.parcelas}
                  startDate={item.data_inicio}
                  expensesTypes={item.tipo_despesa}
                  limitDate={item.vencimento}
                />
              ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
