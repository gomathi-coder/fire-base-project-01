// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDFJxmKHu0-AP_YKkvpwGNYswS29eubRsM",
    authDomain: "sample-test-01-6cb91.firebaseapp.com",
    projectId: "sample-test-01-6cb91",
    storageBucket: "sample-test-01-6cb91.firebasestorage.app",
    messagingSenderId: "194287425085",
    appId: "1:194287425085:web:86cd120bc40342b801bc54",
    measurementId: "G-XT36H6GQ33"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
