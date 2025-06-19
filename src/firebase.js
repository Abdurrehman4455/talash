// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl8eVTxetFYBV2Df0jcKBY1QrCFIK1id8",
  authDomain: "talash-travel.firebaseapp.com",
  projectId: "talash-travel",
  storageBucket: "talash-travel.appspot.com",  // ✅ Fixed domain
  messagingSenderId: "82185370144",
  appId: "1:82185370144:web:fe0bf1fa8945daf68f5a45"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);