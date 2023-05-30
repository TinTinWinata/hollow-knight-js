import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import {
  addDoc,
  collection,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyD3sJsDKjz9hapWCXge0gyk7CMwqJmZzfM',
  authDomain: 'hollow-knight-2d0c8.firebaseapp.com',
  projectId: 'hollow-knight-2d0c8',
  storageBucket: 'hollow-knight-2d0c8.appspot.com',
  messagingSenderId: '840971568301',
  appId: '1:840971568301:web:11d0deb251d61c3585f224',
};
// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// Initialize Div
const lButtonDiv = $('#loginButton');
const rButtonDiv = $('#registerButton');

const lEmailDiv = $('#loginEmail');
const lPasswordDiv = $('#loginPassword');

const rPasswordDiv = $('#registerPassword');
const rUsernameDiv = $('#registerUsername');
const rLocationDiv = $('#registerLocation');
const rLastNameDiv = $('#registerLastName');
const rFirstNameDiv = $('#registerFirstName');
const rEmailDiv = $('#registerEmail');

const registerFirebaseAuth = async (data) => {
  const userRef = collection(db, 'users');
  try {
    const doc = await addDoc(userRef, data);
    const userCred = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return true;
  } catch (err) {
    const errCode = err.code;
    const errMessage = err.message;
    return err;
  }
};

const loginFirebaseAuth = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    const errCode = err.code;
    const errMessage = err.message;
    return err;
  }
};

const handleLogin = async () => {
  const email = lEmailDiv.val();
  const password = lPasswordDiv.val();
  if (loginFirebaseAuth(email, password)) {
    window.location.replace('/index.html');
  }
};

const handleRegister = async () => {
  const password = rPasswordDiv.val();
  const username = rUsernameDiv.val();
  const location = rLocationDiv.val();
  const lastName = rLastNameDiv.val();
  const firstName = rFirstNameDiv.val();
  const email = rEmailDiv.val();
  const data = {
    password,
    username,
    location,
    lastName,
    firstName,
    email,
  };
  const response = await registerFirebaseAuth(data);
  if (response) {
    window.location.replace('/index.html');
  }
};

lButtonDiv.click(handleLogin);
rButtonDiv.click(handleRegister);

// Initiate Animation
const rFormDiv = $('.register-form');
const lFormDiv = $('.login-form');
const rBtn = $('.register-button');
const lBtn = $('.login-button');

rFormDiv.animate({ right: '-100%' }, 0);

rBtn.click(() => {
  lFormDiv.animate({ left: '-100%' }, 1000);
  rFormDiv.animate({ right: '0%' }, 500);
});

lBtn.click(() => {
  rFormDiv.animate({ right: '-100%' }, 1000);
  lFormDiv.animate({ left: '0%' }, 500);
});
