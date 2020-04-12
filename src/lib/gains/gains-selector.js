import * as R from "ramda";
import api from "../../services/api";

export function gainsListSelector(state) {
  return R.path(["gains", "itens"], state);
}
export function gainsTotalSelector(state, index) {
  return R.path(["gains", "value", index], state);
}

export function gainsMonthActive(state) {
  return R.path(["gains", "active"], state);
}

export function gainsListOrder(state) {
  const sorted = R.sortWith([R.ascend(R.prop("limitDate"))]);
  return sorted(state);
}

let totalPerMonth = [];
export function gainsTotalValue(state) {
  if (state.total <= 1) {
    return state.docs[0].value;
  } else {
    let valorTotal = 0;
    state.map(item => {
      valorTotal = 0;

      item.map(item => {
        return (valorTotal += parseInt(item.value));
      });
      totalPerMonth.push(valorTotal);
    });

    return totalPerMonth;
  }
}

let filteredPerMonth = [];
export async function gainsGet() {
  try {
    const res = await api.get("/gains");
    const listOrdered = gainsListOrder(res.data.docs);

    for (let i = 1; i <= 12; i++) {
      filteredPerMonth.push(
        listOrdered.filter(item => {
          let mes = item.limitDate.split("-");
          return mes[1] === i.toString().padStart(2, 0);
        })
      );
    }
    return filteredPerMonth;
  } catch (error) {
    console.log("ERRRO", error);
    return error;
  }
}
