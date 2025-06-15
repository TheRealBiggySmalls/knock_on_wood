// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // Uncomment if you need Auth
// import { getStorage } from "firebase/storage"; // Uncomment if you need Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcSGyFmMVYkJ3VQ9YR_5mkJJ8kWl1Ceng",
  authDomain: "knock-on-wood-69261.firebaseapp.com",
  projectId: "knock-on-wood-69261",
  storageBucket: "knock-on-wood-69261.appspot.com", // fixed typo
  messagingSenderId: "743586122728",
  appId: "1:743586122728:web:81df2e4760a2b55812325d",
  measurementId: "G-BQHK7L41FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };