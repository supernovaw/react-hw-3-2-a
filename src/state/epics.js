import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, filter, debounceTime, switchMap, catchError, retry } from "rxjs/operators";
import searchRequest from "./actionCreators/searchRequest";

export const changeSearchEpic = action$ => action$.pipe(
  ofType("search-request queue"),
  map(o => o.payload.query.trim()),
  filter(o => o !== ''),
  debounceTime(100),
  map(o => searchRequest.initiate(o))
);

export const searchSkillsEpic = action$ => action$.pipe(
  ofType("search-request initiate"),
  map(o => o.payload.query),
  map(o => new URLSearchParams({ q: o })),
  switchMap(
    o => ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
      retry(1),
      map(o => searchRequest.succeeded(o)),
      catchError(e => of(searchRequest.failed(e)))
    )
  )
);
