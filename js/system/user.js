import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

const auth = getAuth();
const user = auth.currentUser;

