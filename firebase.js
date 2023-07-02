
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCONP8Ezg1tcT0tomwopvVh9H99qi0E5t0",
  authDomain: "rn-instagram-clone-57190.firebaseapp.com",
  projectId: "rn-instagram-clone-57190",
  storageBucket: "rn-instagram-clone-57190.appspot.com",
  messagingSenderId: "964430555220",
  appId: "1:964430555220:web:f4da4e94cb78d6c1fb25c1"
};

//initialise firebase
!firebase.apps.length ?firebase.initializeApp(firebaseConfig):firebase.app()

const db = firebase.firestore()
export  {firebase , db}