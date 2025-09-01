// ================== PASSWORD TOGGLE ==================
document.getElementById("toggle-password").addEventListener("click", () => {
  const passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// ================== FIREBASE IMPORTS ==================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// ================== FIREBASE CONFIG ==================
const firebaseConfig = {
  apiKey: "AIzaSyD4QEV91A5CH20dRr8nLfVXwVaVEigAqnA",
  authDomain: "mediq-aw.firebaseapp.com",
  projectId: "mediq-aw",
  storageBucket: "mediq-aw.firebasestorage.app",
  messagingSenderId: "379415350029",
  appId: "1:379415350029:web:eb2188338094b854083e44",
  measurementId: "G-YY6LLQTQ95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// ================== FORM SUBMIT ==================
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get input values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validation
  if (!email) {
    document.getElementById("email-error").textContent = "Email is required";
    return;
  } else {
    document.getElementById("email-error").textContent = "";
  }

  if (password.length < 6) {
    document.getElementById("password-error").textContent =
      "Password must be at least 6 characters";
    return;
  } else {
    document.getElementById("password-error").textContent = "";
  }

  // Firebase login
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Login Successful ✅");
      // ✅ Redirect to homepage after login
      window.location.href = "../HTML/home.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: FILL CORRECT DETAILS!" + errorMessage);
    });
});
