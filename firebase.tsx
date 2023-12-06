// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8o8QspkmaBCqD7JTdE5hIHpVTuP05fh4",
  authDomain: "travelsnap-60f9b.firebaseapp.com",
  projectId: "travelsnap-60f9b",
  storageBucket: "travelsnap-60f9b.appspot.com",
  messagingSenderId: "64612321983",
  appId: "1:64612321983:web:fe6eaf8d3b7dd37aca540a",
  measurementId: "G-PFNVGHP617"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };