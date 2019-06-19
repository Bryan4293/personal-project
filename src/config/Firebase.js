import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCDunNMgpnDpJSya8G1UX4viiYddOJm17Q",
    authDomain: "peasonal-project.firebaseapp.com",
    databaseURL: "https://peasonal-project.firebaseio.com",
    projectId: "peasonal-project",
    storageBucket: "peasonal-project.appspot.com",
    messagingSenderId: "862816420045",
    appId: "1:862816420045:web:abce19922bdea87f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true});

  export default firebase;