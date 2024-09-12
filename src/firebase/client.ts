import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Tus credenciales de la aplicación web
const firebaseConfig = {
  apiKey: 'AIzaSyAUZ6nU3sKP6e5lxO5OLh2opflhwo_SKOo',
  authDomain: 'mundo-vinilos.firebaseapp.com',
  databaseURL: 'https://mundo-vinilos-default-rtdb.firebaseio.com',
  projectId: 'mundo-vinilos',
  storageBucket: 'mundo-vinilos.appspot.com',
  messagingSenderId: '530268772709',
  appId: '1:530268772709:web:890afd79f8a3d40542a98c',
  measurementId: 'G-GH28GM6EVG'
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
