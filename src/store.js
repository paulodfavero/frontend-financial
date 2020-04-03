import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../src/lib/root-reducer";

const store = createStore(reducer, composeWithDevTools());

export default store;
