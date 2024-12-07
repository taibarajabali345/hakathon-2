// Import Firebase modules
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB__HRAuks6t9rPapCrjR9sW22XfgekZz0",
  authDomain: "hakathon-fe22f.firebaseapp.com",
  projectId: "hakathon-fe22f",
  storageBucket: "hakathon-fe22f.firebasestorage.app",
  messagingSenderId: "475602066039",
  appId: "1:475602066039:web:12f4014c1eebe3e1a84472"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  if (!email || !password) {
    alert("Please fill out both email and password fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password should be at least 6 characters long.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Save user data in Firestore
      await writeData(name, email);
      console.log("User stored in database.");

      alert("Sign up successful! Welcome, " + user.email);
      // Redirect after signup
      window.location.pathname = "./login.html"; // Adjust the redirect path as needed
    })
    .catch((error) => {
      console.error("Error signing up:", error.code, error.message);
      alert("Error: " + error.message);
    });
}

// Function to write data to Firestore
async function writeData(name, email) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
    });
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

// Attach event listener to signup button
document.getElementById("signupButton")?.addEventListener("click", signup);

// Login function
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill out both email and password fields.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Signed in successfully:", user);

    // Save to session storage and redirect
    sessionStorage.setItem("user", JSON.stringify(user));
    alert("Logged in successfully!");
    window.location.pathname = "./postmassage.html"; // Redirect to home page or dashboard
  } catch (error) {
    console.error("Login error:", error.message);
    alert("Error: " + error.message);
  }
}

// Attach event listener to login button
document.getElementById("loginButton")?.addEventListener("click", login);
