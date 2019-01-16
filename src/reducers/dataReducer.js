import { FETCH_TODOS, FETCH_VISITS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload;
    case FETCH_VISITS:
      return action.payload;
    default:
      return state;
  }
};