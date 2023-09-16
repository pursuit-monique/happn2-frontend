

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_SENDERID;
const appId = process.env.REACT_APP_FIREBASE_APPID;


const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
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


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
