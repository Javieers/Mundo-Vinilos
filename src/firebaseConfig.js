// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUZ6nU3sKP6e5lxO5OLh2opflhwo_SKOo",
  authDomain: "mundo-vinilos.firebaseapp.com",
  databaseURL: "https://mundo-vinilos-default-rtdb.firebaseio.com",
  projectId: "mundo-vinilos",
  storageBucket: "mundo-vinilos.appspot.com",
  messagingSenderId: "530268772709",
  appId: "1:530268772709:web:890afd79f8a3d40542a98c",
  measurementId: "G-GH28GM6EVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { auth, createUserWithEmailAndPassword };