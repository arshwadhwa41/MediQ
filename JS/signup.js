// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD4QEV91A5CH20dRr8nLfVXwVaVEigAqnA",
  authDomain: "mediq-aw.firebaseapp.com",
  projectId: "mediq-aw",
  storageBucket: "mediq-aw.appspot.com",
  messagingSenderId: "379415350029",
  appId: "1:379415350029:web:eb2188338094b854083e44",
  measurementId: "G-YY6LLQTQ95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle signup
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("❌ Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ User created:", userCredential.user);
    alert("Signup Successful 🎉");

    // 👉 Redirect after success
    window.location.href = "home.html";

  } catch (error) {
    console.error("❌ Error:", error.message);
    alert(error.message);
  }
});
