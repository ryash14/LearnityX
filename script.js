// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAf0D6UYNfMDdqTccA2xIE92DFz2OcZcgs",
  authDomain: "skill-bench.firebaseapp.com",
  projectId: "skill-bench",
  storageBucket: "skill-bench.appspot.com",
  messagingSenderId: "875173679194",
  appId: "1:875173679194:web:026484efde0a5c4e634863",
  measurementId: "G-XSSV8188KF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const authButtons = document.getElementById('authButtons');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const profileImage = document.getElementById('profileImage');
const profileBtnImage = document.getElementById('profileBtnImage');
const profileName = document.getElementById('profileName');
const signOutBtn = document.getElementById('signOutBtn');
const loader = document.querySelector('.loader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Toggle dropdown
let dropdownVisible = false;

profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownVisible = !dropdownVisible;
  profileDropdown.style.display = dropdownVisible ? 'block' : 'none';
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  if (dropdownVisible) {
    dropdownVisible = false;
    profileDropdown.style.display = 'none';
  }
});

// Sign out
signOutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.error('Sign out error:', error);
  });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Auth state observer with loading management
let authCheckComplete = false;

// Show loader while checking auth state
loader.classList.remove('hidden');

onAuthStateChanged(auth, (user) => {
  // Once auth state is determined, hide loader
  if (!authCheckComplete) {
    setTimeout(() => {
      loader.classList.add('hidden');
      authCheckComplete = true;
    }, 500); // Minimum loading time for better UX
  }

  if (user) {
    // User is signed in
    authButtons.style.display = 'none';
    profileBtn.style.display = 'block';
    
    // Update profile info
    if (user.photoURL) {
      profileImage.src = user.photoURL;
      profileBtnImage.src = user.photoURL;
    } else {
      // Use default avatar with user's first initial
      const defaultAvatar = `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=00c896&color=fff&rounded=true`;
      profileImage.src = defaultAvatar;
      profileBtnImage.src = defaultAvatar;
    }
    
    profileName.textContent = user.displayName || user.email.split('@')[0];
  } else {
    // User is signed out
    authButtons.style.display = 'flex';
    profileBtn.style.display = 'none';
    profileDropdown.style.display = 'none';
    dropdownVisible = false;
  }
});

// Hide loader after maximum wait time (fallback)
setTimeout(() => {
  if (!authCheckComplete) {
    loader.classList.add('hidden');
    authCheckComplete = true;
  }
}, 2000); // Maximum wait time of 2 seconds