import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const visitsRef = databaseRef.child("visits");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const getGlobalVisitsTally = firebase.functions().httpsCallable('visitsGlobalTally');

const storageRef = firebase.storage().ref();