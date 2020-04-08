import { combineReducers } from "redux";

import { reducer as menu } from "./menuFast/menu-reducer";
import { reducer as expenses } from "./expenses/expenses-reducer";
import { reducer as gains } from "./gains/gains-reducer";

export default combineReducers({
  menu,
  expenses,
  gains
});
