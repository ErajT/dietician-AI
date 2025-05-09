// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu3g6LsSSYPI76ADyDzKFFIGYgLWrnx_c",
  authDomain: "velora-ead28.firebaseapp.com",
  projectId: "velora-ead28",
  storageBucket: "velora-ead28.appspot.com",
  messagingSenderId: "302157234503",
  appId: "1:302157234503:web:0c8c7bf7993539a64d4c62",
  measurementId: "G-HCJG13WXME"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

export {auth};