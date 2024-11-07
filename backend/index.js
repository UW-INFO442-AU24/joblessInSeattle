import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjYRvRQyyjJORIqi-wFtsZOD45sPesaOo",
  authDomain: "daymax-86edc.firebaseapp.com",
  projectId: "daymax-86edc",
  storageBucket: "daymax-86edc.appspot.com",
  messagingSenderId: "1076553295004",
  appId: "1:1076553295004:web:7d726d496f81062e277959"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App auth={auth} />
  </React.StrictMode>
);
