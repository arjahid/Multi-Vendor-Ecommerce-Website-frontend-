// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwM9HEj9cgEiwSYq9riBbrFj_YMDWEtCw",
  authDomain: "easyshop-d4bbe.firebaseapp.com",
  projectId: "easyshop-d4bbe",
  storageBucket: "easyshop-d4bbe.firebasestorage.app",
  messagingSenderId: "572431998131",
  appId: "1:572431998131:web:ae5ef64192b9a47a8c24c6",
  measurementId: "G-ZVEXMB6V5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;