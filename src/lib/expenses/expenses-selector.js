import * as R from "ramda";
import api from "../../services/api";

export function expensesListSelector(state) {
  return R.path(["expenses", "itens"], state);
}
export function expensesTotalSelector(state) {
  return R.path(["expenses", "value"], state);
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

export async function expensesGet() {
  try {
    const res = await api.get("/expenses");
    const listOrdered = expensesListOrder(res.data.docs);
    return listOrdered;
  } catch (error) {
    console.log("ERRRO", error);
    return error;
  }
}
