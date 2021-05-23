import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG2r2ist_wuyR61ZJESaQ1yNnWW3BwXCs",
  authDomain: "nextapp-40cca.firebaseapp.com",
  projectId: "nextapp-40cca",
  storageBucket: "nextapp-40cca.appspot.com",
  messagingSenderId: "1048139596175",
  appId: "1:1048139596175:web:aad49305c1cd83de3acbfa",
  measurementId: "G-ZCMQQHWDZM",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
