const base = "search-request "; // action base

const queue = query => ({ type: base + "queue", payload: { query } });
const initiate = query => ({ type: base + "initiate", payload: { query } });
const failed = error => ({ type: base + "failed", payload: { error } });
const succeeded = items => ({ type: base + "succeeded", payload: { items } });

export default {
  queue,
  initiate,
  failed,
  succeeded
};
