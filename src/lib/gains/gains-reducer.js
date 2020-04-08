const LISTED_GAINS = "LISTED_GAINS";
const TOTAL_GAINS = "TOTAL_GAINS";
const CREATED_LIST = "CREATED_LIST";

const initialState = {
  createdList: true
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTED_GAINS:
      return {
        ...state,
        createdList: action.payload.createdList
      };

    case TOTAL_GAINS:
      return {
        ...state,
        value: action.payload.value
      };
    case CREATED_LIST:
      return {
        ...state,
        itens: action.payload.itens
      };

    default:
      return state;
  }
};

export const gainsListUpdated = createdList => {
  return {
    type: LISTED_GAINS,
    payload: {
      createdList
    }
  };
};
export const gainsTotal = value => {
  return {
    type: TOTAL_GAINS,
    payload: {
      value
    }
  };
};

export const expensesList = itens => {
  return {
    type: CREATED_LIST,
    payload: {
      itens
    }
  };
};
