import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


const firebaseConfig = {
  apiKey: "AIzaSyAj2lTxcZEgMLaUwPu_3xeLh1ISQ3U_BdI",
  authDomain: "bluebounty-uncc.firebaseapp.com",
  projectId: "bluebounty-uncc",
  storageBucket: "bluebounty-uncc.appspot.com",
  messagingSenderId: "1025609686360",
  appId: "1:1025609686360:web:45faf3decb14a63362192d",
  measurementId: "G-SD5232Y2P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
