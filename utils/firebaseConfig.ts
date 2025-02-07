import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCd77j7Heel2QJNZmI_vRPZd2lT6OJpKD0",
  authDomain: "todo-56343.firebaseapp.com",
  projectId: "todo-56343",
  storageBucket: "todo-56343.firebasestorage.app",
  messagingSenderId: "319392079984",
  appId: "1:319392079984:web:911a7a9e730f29b19694b5",
  measurementId: "G-D3LPHXMKEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;