import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
  apiKey: "AIzaSyD_zo1EAWtKHxqKPlryXcBVN29FxN7U9oI",
  authDomain: "carrot-market-8ce6a.firebaseapp.com",
  databaseURL:
    "https://carrot-market-8ce6a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carrot-market-8ce6a",
  storageBucket: "carrot-market-8ce6a.appspot.com",
  messagingSenderId: "391315034849",
  appId: "1:391315034849:web:3bc47d64e38d434e8a9da0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const auth = getAuth(app);
