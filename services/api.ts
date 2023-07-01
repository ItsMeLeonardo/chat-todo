// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjSOj9SrnVyQ5WjM7EPOLJpBjtnooLcgs",
  authDomain: "chat-todo-app.firebaseapp.com",
  projectId: "chat-todo-app",
  storageBucket: "chat-todo-app.appspot.com",
  messagingSenderId: "922966015577",
  appId: "1:922966015577:web:dd647e847b3df77e747b48",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
