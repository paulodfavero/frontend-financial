const OPEN_MENU = "OPEN_MENU";

const initialState = {
  isOpened: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, isOpened: action.payload.isOpened };
    default:
      return state;
  }
};

export const handleOpenMenu = isOpened => {
  return {
    type: OPEN_MENU,
    payload: {
      isOpened
    }
  };
};
