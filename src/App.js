import "./App.css";
import { connect } from "react-redux";
import searchRequestCreators from "./state/actionCreators/searchRequest";
import classNames from "classnames";

const App = ({ queueSearch, searchRequest }) => {
  const handleChangeSearch = e => queueSearch(e.target.value);

  const requestStatus = <div className={classNames("request-status", { "error": !!searchRequest.status.error })}>
    {searchRequest.status.loading && "Loading..."}
    {!!searchRequest.status.error && "Server failure (" + searchRequest.status.error + ")"}
  </div>

  return (
    <div className="App">
      <input type="text" onChange={handleChangeSearch} placeholder="Type something to search" />
      {requestStatus}
      <div className="search-results">
        {searchRequest.items?.map(item => <div key={item.id}>
          {item.name}
        </div>)}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  queueSearch: query => dispatch(searchRequestCreators.queue(query))
});
export default connect(s => ({ ...s }), mapDispatchToProps)(App);
