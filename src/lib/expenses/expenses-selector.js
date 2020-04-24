import * as R from "ramda";
import api from "../../services/api";

import moment from "moment-timezone";

const getCurrentYear = () => {
  return moment(new Date()).format("Y");
};

export function expensesListSelector(state) {
  return R.path(["expenses", "itens"], state);
}
export function expensesTotalSelector(state, index) {
  return R.path(["expenses", "value", index], state);
}

export function expensesMonthActive(state) {
  return R.path(["expenses", "active"], state);
}

export function expensesListOrder(state) {
  const sorted = R.sortWith([R.ascend(R.prop("limitDate"))]);
  return sorted(state);
}

export function expensesTotalValue(state) {
  let totalPerMonth = [];
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

export async function expensesGet() {
  try {
    const res = await api.get("/expenses");
    const listOrdered = expensesListOrder(res.data.docs);
    let filteredPerMonth = [];
    for (let i = 1; i <= 12; i++) {
      filteredPerMonth.push(
        listOrdered &&
          listOrdered.filter(item => {
            let mes = item.limitDate.split("-");
            return (
              mes[1] === i.toString().padStart(2, 0) &&
              mes[0] === getCurrentYear()
            );
          })
      );
    }
    return filteredPerMonth;
  } catch (error) {
    console.log("ERRRO", error);
    return error;
  }
}

export async function expensesUpdateStatus(id, status) {
  try {
    await api.put(`/expenses/${id}`, { status });
  } catch (error) {
    console.log("Error to update status", error);
  }
}
