import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from './firebase-config.js';
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { db } from './firebase-config.js';

const provider = new GoogleAuthProvider();

async function saveUser(user) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      isApproved: false
    });
  }
}

async function checkIfApproved(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    return data.isApproved === true;
  }
  return false;
}

document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await saveUser(user);

    const isApproved = await checkIfApproved(user.uid);

    if (isApproved) {
      window.location.href = "dashboard.html";
    } else {
      alert("You are not approved yet. Please wait for Admin to approve.");
      await auth.signOut();
    }

  } catch (error) {
    console.error("Error during sign-in:", error);
  }
});
