import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "knock-on-wood-69261.firebaseapp.com",
  projectId: "knock-on-wood-69261",
  storageBucket: "knock-on-wood-69261.appspot.com", // fixed typo
  messagingSenderId: "743586122728",
  appId: "1:743586122728:web:81df2e4760a2b55812325d",
  measurementId: "G-BQHK7L41FF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };