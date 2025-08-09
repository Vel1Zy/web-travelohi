import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh5O9imq2UNmMaAVRiQ9ZErufT_S8uFRA",
    authDomain: "travelohi-56342.firebaseapp.com",
    projectId: "travelohi-56342",
    storageBucket: "travelohi-56342.appspot.com",
    messagingSenderId: "1038109891169",
    appId: "1:1038109891169:web:db2d67ae6b93f0a594a820"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 
export {storage}