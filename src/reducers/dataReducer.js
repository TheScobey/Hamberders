import { FETCH_TODOS, FETCH_VISITS, FETCH_GLOBAL_VISITS_TALLY } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload;
    case FETCH_VISITS:
      return action.payload;
    case FETCH_GLOBAL_VISITS_TALLY:
      return action.payload;
    default:
      return state;
  }
};