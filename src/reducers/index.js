import { combineReducers } from "redux";

import { toDoList } from "./ToDoReducer";
// import { filterByStatus } from './FilterStatusReducer';

const rootReducer = combineReducers({
  toDoList,
  // filterByStatus
});

export default rootReducer;
