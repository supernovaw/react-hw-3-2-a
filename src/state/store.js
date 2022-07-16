import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { changeSearchEpic, searchSkillsEpic } from "./epics";
import searchRequest from "./reducers/searchRequest";

const reducers = combineReducers({
  searchRequest
});
const epics = combineEpics(
  changeSearchEpic,
  searchSkillsEpic
);

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(epics);

export default store;
