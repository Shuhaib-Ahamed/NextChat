// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBr1cy9nozrI7YIiRI3fL1T84AMo3nUh-Y",
  authDomain: "nextchat-c97a7.firebaseapp.com",
  projectId: "nextchat-c97a7",
  storageBucket: "nextchat-c97a7.appspot.com",
  messagingSenderId: "566807054781",
  appId: "1:566807054781:web:133169b0c40cbcfda86ad4",
  measurementId: "G-2FF4RLBM72",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
