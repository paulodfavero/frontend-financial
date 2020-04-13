const LISTED_EXPENSES = "LISTED_EXPENSES";
const TOTAL_EXPENSES = "TOTAL_EXPENSES";
const CREATED_LIST_EXPENSES = "CREATED_LIST_EXPENSES";
const ACTIVED_MONTH = "ACTIVED_MONTH";

const initialState = {
  createdList: true,
  active: ""
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
    case CREATED_LIST_EXPENSES:
      return {
        ...state,
        itens: action.payload.itens
      };
    case ACTIVED_MONTH:
      return {
        ...state,
        active: action.payload.active
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
export const expensesList = itens => {
  return {
    type: CREATED_LIST_EXPENSES,
    payload: {
      itens
    }
  };
};

export const expensesMonth = active => {
  return {
    type: ACTIVED_MONTH,
    payload: {
      active
    }
  };
};
