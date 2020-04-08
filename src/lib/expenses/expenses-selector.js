import * as R from "ramda";
import api from "../../services/api";

export async function expensesGet() {
  try {
    const res = await api.get("/expenses");
    console.log("FOI", res.data.docs);
    return res.data.docs;
  } catch (error) {
    console.log("ERRRO", error);
    return error;
  }
}
export function expensesList(state) {
  return R.path(["expenses", "itens"], state);
}

export function expensesListOrder(state) {
  const sorted = R.sortWith([R.ascend(R.prop("limitDate"))]);
  return sorted(state);
}
export function expensesTotalValue(state) {
  if (state.total <= 1) {
    return state.docs[0].value;
  } else {
    let valorTotal = 0;
    state.map(item => {
      return (valorTotal += parseInt(item.value));
    });
    return valorTotal;
  }
}
