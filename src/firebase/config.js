// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAk_T7u2utEaqSEnfmKX5G8F0VUxcAq28A",
	authDomain: "photo-app-588be.firebaseapp.com",
	projectId: "photo-app-588be",
	storageBucket: "photo-app-588be.appspot.com",
	messagingSenderId: "405696873202",
	appId: "1:405696873202:web:67636fba7e7749fdd0866b",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const projectStorage = getStorage();
const projectFirestore = getFirestore();

export { projectStorage, projectFirestore };
