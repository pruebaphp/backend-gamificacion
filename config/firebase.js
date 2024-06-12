import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.KEY_FIREBASE,
  authDomain: "gami-8b66c.firebaseapp.com",
  projectId: "gami-8b66c",
  storageBucket: "gami-8b66c.appspot.com",
  messagingSenderId: "999712550688",
  appId: "1:999712550688:web:85bbd41fba2fad20707145",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
