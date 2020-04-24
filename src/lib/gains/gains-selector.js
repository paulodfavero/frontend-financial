import * as R from "ramda";
import api from "../../services/api";
import moment from "moment-timezone";

const getCurrentYear = () => {
  return moment(new Date()).format("Y");
};

function filteredPerMonth(list) {
  let filteredPerMonth = [];
  for (let i = 1; i <= 12; i++) {
    filteredPerMonth.push(
      list &&
        list.filter(item => {
          let mes = item.limitDate.split("-");
          return (
            mes[1] === i.toString().padStart(2, 0) &&
            mes[0] === getCurrentYear()
          );
        })
    );
  }
  return filteredPerMonth;
}

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

export async function gainsListOrderType(type) {
  try {
    const state = await api.get("/gains");
    const sorted = await R.filter(
      item => item.gainsType === type,
      state.data.docs
    );
    const listOrdered = gainsListOrder(sorted);
    return filteredPerMonth(listOrdered);
  } catch (error) {
    console.log("ERROUuUUU", error);
  }
}

export function gainsTotalValue(state) {
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

export async function gainsGet() {
  try {
    const res = await api.get("/gains");
    const listOrdered = gainsListOrder(res.data.docs);
    return filteredPerMonth(listOrdered);
  } catch (error) {
    console.log("ERRRO", error);
    return error;
  }
}

export async function gainsUpdateStatus(id, status) {
  try {
    await api.put(`/gains/${id}`, { status });
  } catch (error) {
    console.log("Error to update status GAINS", error);
  }
}
