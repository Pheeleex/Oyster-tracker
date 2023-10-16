// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAdxWAetWNHGti3I52jvuuK9RdZkNMe8w",
    authDomain: "budget-tracker-fe5fd.firebaseapp.com",
    projectId:"budget-tracker-fe5fd",
    storageBucket: "budget-tracker-fe5fd.appspot.com",
    messagingSenderId: "504040102570",
    appId: "1:504040102570:web:51b2068f387cc44b2b8ed3",
    measurementId: "G-9BF0HMBRLT"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

console.log(process.env.REACT_APP_FIREBASE_API_KEY);
