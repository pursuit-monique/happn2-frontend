// Import the functions you need from the SDKs you need
// react setting
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
// vanilla js setting
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  // signInWithRedirect,
  GoogleAuthProvider,
  // OAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
/////////////////////////////////////////
const authByGoogle = (callback) => {
  // 使用弹出窗口方式登录
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // 登录成功的处理
      var user = result.user;
      const { accessToken, uid, displayName, email } = user;
      callback(accessToken);
    })
    .catch(function (error) {
      // 错误处理
      console.error(error);
    });
};

export { authByGoogle };
