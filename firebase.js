import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCx6A_02Qfg-F2O-pzLNNtxvQTORd8IJk",
  authDomain: "next-7fc96.firebaseapp.com",
  projectId: "next-7fc96",
  storageBucket: "next-7fc96.appspot.com",
  messagingSenderId: "923572349325",
  appId: "1:923572349325:web:6f509543f0101b4b5d35c4",
  measurementId: "G-V7RHJKSP4M",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
