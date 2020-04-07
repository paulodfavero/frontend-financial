import { combineReducers } from "redux";

import { reducer as menu } from "./menuFast/menu-reducer";
import { reducer as expensesListUpdated } from "./expenseList/expense-reducer";

export default combineReducers({
  menu,
  expensesListUpdated
});
