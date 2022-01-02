
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyC_yQF-yyAm-0Ere03VlIgwysmWgqWdek8",
    authDomain: "crwn-db-f7dd1.firebaseapp.com",
    projectId: "crwn-db-f7dd1",
    storageBucket: "crwn-db-f7dd1.appspot.com",
    messagingSenderId: "216285686015",
    appId: "1:216285686015:web:59759f769d7e0a5e1284ca",
    measurementId: "G-SQ42H3G5QX"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
