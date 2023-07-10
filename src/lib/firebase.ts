import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { SECRET_FIREBASE_CONFIG } from "$env/static/private";

const firebaseConfig = JSON.parse(SECRET_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
