import * as R from "ramda";

export function gainsList(state) {
  return R.path(["gains", "createdList"], state);
}

export function gainsListOrder(state) {
  const sorted = R.sortWith([R.ascend(R.prop("limitDate"))]);
  return sorted(state.data.docs);
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
