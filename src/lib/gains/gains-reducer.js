import moment from "moment-timezone";

const LISTED_GAINS = "LISTED_GAINS";
const TOTAL_GAINS = "TOTAL_GAINS";
const CREATED_LIST_GAINS = "CREATED_LIST_GAINS";
const ACTIVED_MONTH = "ACTIVED_MONTH";

const getCurrentMonth = () => {
  return parseInt(moment(new Date()).format("M") - 1);
};

const initialState = {
  createdList: true,
  active: ""
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
    case CREATED_LIST_GAINS:
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

export const gainsList = itens => {
  return {
    type: CREATED_LIST_GAINS,
    payload: {
      itens
    }
  };
};

export const gainsMonth = active => {
  return {
    type: ACTIVED_MONTH,
    payload: {
      active
    }
  };
};
