const LISTED_EXPENSES = "LISTED_EXPENSES";
const TOTAL_EXPENSES = "TOTAL_EXPENSES";

const initialState = {
  createdList: true,
  value: ""
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTED_EXPENSES:
      return {
        ...state,
        createdList: action.payload.createdList
      };
    case TOTAL_EXPENSES:
      return {
        ...state,
        value: action.payload.value
      };

    default:
      return state;
  }
};

export const expensesListUpdated = createdList => {
  return {
    type: LISTED_EXPENSES,
    payload: {
      createdList
    }
  };
};

export const expensesTotal = value => {
  return {
    type: TOTAL_EXPENSES,
    payload: {
      value
    }
  };
};
