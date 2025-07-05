import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxQ_ecmATCayHYGl27GOlDusjZq6vSrno",
  authDomain: "obsidia-a1830.firebaseapp.com",
  projectId: "obsidia-a1830",
  storageBucket: "obsidia-a1830.firebasestorage.app",
  messagingSenderId: "707630421267",
  appId: "1:707630421267:web:e456315ca088f44d94b6e6",
  measurementId: "G-TS0NCWJ31B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
