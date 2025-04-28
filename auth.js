// auth.js
import { auth, provider, db } from './firebase-config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

async function signIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Save user to Firestore if not existing
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                isApproved: false,
                name: user.displayName
            });
        }

    } catch (error) {
        console.error(error);
    }
}

function signOutUser() {
    signOut(auth);
}

async function checkApproval(uid) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data().isApproved === true) {
        return true;
    } else {
        return false;
    }
}

export { signIn, signOutUser, onAuthStateChanged, checkApproval };
