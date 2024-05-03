import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCMVeirlLkrrZahfP5tKxCLjXlPo7ZMU4s",
    authDomain: "chat-app-e9b3f.firebaseapp.com",
    projectId: "chat-app-e9b3f",
    storageBucket: "chat-app-e9b3f.appspot.com",
    messagingSenderId: "933989143804",
    appId: "1:933989143804:web:ba60595ed768a6e919b379",
    measurementId: "G-Y281DQFVM0"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth()
const db = firebase.firestore()

auth.useEmulator('http://localhost:9099')
if(window.location.hostname === 'localhost'){
    db.useEmulator('localhost','8080')
}

export {db,auth}
export default firebase;

//npm i -g firebase-tools
//firebase init
//firebase emulators:start