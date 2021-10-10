import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsc7mN1bxIPdA12juDz98WOvPXTQdnwdQ",
    authDomain: "schedulerreact.firebaseapp.com",
    databaseURL: "https://schedulerreact-default-rtdb.firebaseio.com",
    projectId: "schedulerreact",
    storageBucket: "schedulerreact.appspot.com",
    messagingSenderId: "1027129562511",
    appId: "1:1027129562511:web:28e6da140e3c95af0ba7fa",
    measurementId: "G-6DMWXZ92CM"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };