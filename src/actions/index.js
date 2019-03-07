import { todosRef, authRef, provider, visitsRef, getGlobalVisitsTally } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER, FETCH_VISITS, FETCH_GLOBAL_VISITS_TALLY } from "./types";

export const fetchVisits = uid => async dispatch => {
  visitsRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_VISITS,
      payload: snapshot.val()
    });
  });
};

export const fetchGlobalVisitsTally = () => async dispatch => {
  getGlobalVisitsTally()
    .then(function (result) {
      // Read result of the Cloud Function.
      dispatch({
        type: FETCH_GLOBAL_VISITS_TALLY,
        payload: result.data.text
      });
    }).catch(function(error) {
      // Getting the Error details.
      console.log(error.code);
      console.log(error.message);
      console.log(error.details);
    });
    ;
};

export const addVisits = (newVisit, uid) => async dispatch => {
  visitsRef
    .child(uid)
    .push()
    .set(newVisit);
};

export const removeVisits = (visitKey, uid) => async dispatch => {
  visitsRef
    .child(uid)
    .child(visitKey)
    .remove(0);
};

export const addToDo = (newToDo, uid) => async dispatch => {
  todosRef
    .child(uid)
    .push()
    .set(newToDo);
};

export const completeToDo = (completeToDoId, uid) => async dispatch => {
  todosRef
    .child(uid)
    .child(completeToDoId)
    .remove();
};

export const fetchToDos = uid => async dispatch => {
  todosRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => { })
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};