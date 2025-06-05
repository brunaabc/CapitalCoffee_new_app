import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; // se for usar auth
import { getFirestore } from 'firebase/firestore'; // se for usar banco

const firebaseConfig = {
  apiKey: "AIzaSyAGWXEozjfdjBZtmtVyo2X252WfP7-tFf0",
  authDomain: "capital-coffee-new-app.firebaseapp.com",
  projectId: "capital-coffee-new-app",
  storageBucket: "capital-coffee-new-app.firebasestorage.app",
  messagingSenderId: "772610051232",
  appId: "1:772610051232:web:eafc5865c8a9635a9c4dc5",
  measurementId: "G-MLT65TVT2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
