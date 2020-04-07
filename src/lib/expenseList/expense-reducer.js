const LISTED_EXPENSES = "LISTED_EXPENSES";

const initialState = {
  createdList: true
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTED_EXPENSES:
      return {
        ...state,
        createdList: action.payload.createdList
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
