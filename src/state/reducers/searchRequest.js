const actionBase = "search-request ";

const statusIdle = error => ({ loading: false, error });
const statusWait = () => ({ loading: true, error: null });

const defaultState = {
  query: '',
  status: statusIdle(),
  items: []
}

export default (state = defaultState, { type, payload }) => {
  if (!type.startsWith(actionBase)) return state;
  const subAction = type.substring(actionBase.length);

  switch (subAction) {
/*    */  case "queue": return { ...state, query: payload.query };
/* */  case "initiate": return { ...state, status: statusWait() }
/*   */  case "failed": return { ...state, status: statusIdle(payload.error) }
/**/  case "succeeded": return { ...state, status: statusIdle(), items: payload.items }
  }

  console.error("unrecognized " + actionBase + "subaction '" + subAction + "'!");
  return state;
};