// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApiCR7ITyJwGMFX-M_alYuwWCyJ4JhTtk",
  authDomain: "authfirebas-8c973.firebaseapp.com",
  projectId: "authfirebas-8c973",
  storageBucket: "authfirebas-8c973.firebasestorage.app",
  messagingSenderId: "622534031203",
  appId: "1:622534031203:web:60425279ffbf49f76e8556"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Event Listener untuk Sign Up
const buttonSignup = document.getElementById("button_signup");
buttonSignup.addEventListener('click', (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let emailSignup = document.getElementById("email_signup").value.trim();
  let passwordSignup = document.getElementById("psw_signup").value.trim();

  if (!name || !emailSignup || !passwordSignup) {
    alert("Semua field harus diisi!");
    return;
  }

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: name,
        email: emailSignup
      }).then(() => {
        alert("User berhasil ditambahkan!");
      }).catch((error) => {
        alert("Error menyimpan data ke database: " + error.message);
      });
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Event Listener untuk Sign In
const buttonSignin = document.getElementById("button_signin");
buttonSignin.addEventListener('click', (e) => {
  e.preventDefault();

  let emailSignin = document.getElementById("email_signin").value.trim();
  let passwordSignin = document.getElementById("psw_signin").value.trim();

  if (!emailSignin || !passwordSignin) {
    alert("Email dan Password harus diisi!");
    return;
  }

  signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
    .then((userCredential) => {
      const user = userCredential.user;

      // Simpan status login di sessionStorage
      sessionStorage.setItem("loggedIn", "true");

      // Redirect ke index.html
      console.log("Login berhasil! Redirecting to index.html...");
      alert("Login berhasil! Selamat datang, " + user.email);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Login gagal: ", error.message);
      alert("Error: " + error.message);
    });
  
});