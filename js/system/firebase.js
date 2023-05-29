import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

const handleLogin = () => {
  const email = lEmailDiv.val();
  const password = lPasswordDiv.val();
};

const handleRegister = () => {
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
  setDoc(doc(db, 'users'), data);
};

lButtonDiv.click(handleLogin);
rButtonDiv.click(handleRegister);
