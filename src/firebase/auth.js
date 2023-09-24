// // import { auth } from "./firebase";
// // import {
// //   GoogleAuthProvider,
// //   signInWithPopup,
// //   signInWithEmailAndPassword,
// //   createUserWithEmailAndPassword,
// //   sendPasswordResetEmail,
// //   signOut,
// // } from "firebase/auth";

// // const googleProvider = new GoogleAuthProvider();

// // const signInWithGoogle = async () => {
// //   try {
// //     const res = await signInWithPopup(auth, googleProvider);

// //     const user = res.user;

// //     return user;
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //     throw err;
// //   }
// // };

// // const logInWithEmailAndPassword = async (email, password) => {
// //   try {
// //     const res = await signInWithEmailAndPassword(auth, email, password);
// //     return res.user;
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };

// // const registerWithEmailAndPassword = async (name, email, password) => {
// //   try {
// //     const res = await createUserWithEmailAndPassword(auth, email, password);
// //     const user = res.user;
// //     return user;
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };

// // const sendPasswordReset = async (email) => {
// //   try {
// //     await sendPasswordResetEmail(auth, email);
// //     alert("Password reset link sent!");
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };

// // const logout = () => {
// //   signOut(auth);
// //   localStorage.removeItem("user");
// // };

// // export {
// //   signInWithGoogle,
// //   logInWithEmailAndPassword,
// //   registerWithEmailAndPassword,
// //   sendPasswordReset,
// //   logout,
// // };

// // Import the functions you need from the SDKs you need
// // react setting
// // import { initializeApp } from "firebase/app";
// // import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
// // vanilla js setting
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// import { getFirestore } from "firebase/firestore";
// import {
//   getAuth,
//   signInWithPopup,
//   signInWithRedirect,
//   GoogleAuthProvider,
//   OAuthProvider,
// } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
// import { getStorage } from "firebase/storage";
// // Your web app's Firebase configuration
// const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
// const authDomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
// const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
// const storageBucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
// const messagingSenderId = process.env.REACT_APP_FIREBASE_SENDERID;
// const appId = process.env.REACT_APP_FIREBASE_APPID;
// const firebaseConfig = {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// /////////////////////////////////////////
// const authByGoogle = (callback) => {
//   // 使用弹出窗口方式登录
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // 登录成功的处理
//       var user = result.user;
//       const { accessToken, uid, displayName, email } = user;
//       callback(accessToken);
//     })
//     .catch(function (error) {
//       // 错误处理
//       console.error(error);
//     });
// };

// const firestore = getFirestore(app);
// // const auth = getAuth(app);
// const storage = getStorage(app);
// // const authByMicrosoft = (callback) => {
// //   const provider = new OAuthProvider('microsoft.com');
// //   provider.setCustomParameters({
// //     prompt: "consent",
// //     tenant: "consumers",
// //   });
// //   // 使用弹出窗口方式登录
// //   signInWithPopup(auth, provider).then((result) => {
// //     // 登录成功的处理
// //     // var token = result.credential.accessToken;
// //     var user = result.user;
// //     const { accessToken, uid, displayName, email } = user;
// //     fe_.userLoginWithThirdParty(accessToken, (res) => {
// //       callback(res);
// //     })
// //   }).catch(function (error) {
// //     // 错误处理

// //     console.error(error);
// //   });
// // }

// // const authByApple = () => {
// //   const provider = new OAuthProvider('apple.com');
// //   // 使用弹出窗口方式登录
// //   signInWithPopup(auth, provider).then((result) => {
// //     // 登录成功的处理
// //     // var token = result.credential.accessToken;
// //     var user = result.user;
// //     const { accessToken, uid, displayName, email } = user;

// //   }).catch(function (error) {
// //     // 错误处理
// //     console.error(error);
// //   });
// // }

// export { authByGoogle, storage, firestore };
