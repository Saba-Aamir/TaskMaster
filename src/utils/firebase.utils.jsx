import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnpB-z97uvYA7fk7ZzmwHk2QwAe9hF83Q",
  authDomain: "task-master-a04de.firebaseapp.com",
  projectId: "task-master-a04de",
  storageBucket: "task-master-a04de.appspot.com",
  messagingSenderId: "205587254867",
  appId: "1:205587254867:web:ab82418e802608999a80a6",
  measurementId: "G-VN4WBVLVBG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// Force the user to select an account
provider.setCustomParameters({   
  prompt : "select_account "
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return error;
  });