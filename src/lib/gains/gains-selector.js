import * as R from "ramda";
import api from "../../services/api";

export function gainsListSelector(state) {
  return R.path(["gains", "itens"], state);
}
export function gainsTotalSelector(state) {
  return R.path(["gains", "value"], state);
}

export function gainsListOrder(state) {
  const sorted = R.sortWith([R.ascend(R.prop("limitDate"))]);
  return sorted(state);
}
export function gainsTotalValue(state) {
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

export async function gainsGet() {
  try {
    const res = await api.get("/gains");
    const listOrdered = gainsListOrder(res.data.docs);
    return listOrdered;
  } catch (error) {
    console.log("ERRRO", error);
    return error;
  }
}
