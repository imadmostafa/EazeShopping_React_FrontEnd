import firebase from 'firebase';
import firestore from 'firebase/firestore'
const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
    apiKey: "AIzaSyDt7V_laB7O5i5Qhg98n8eS0Z56cbO5oAU",
    authDomain: "first-cloud-messaging-fe741.firebaseapp.com",
    projectId: "first-cloud-messaging-fe741",
    storageBucket: "first-cloud-messaging-fe741.appspot.com",
    messagingSenderId: "1078262663145",
    appId: "1:1078262663145:web:c646e13752c1617688ad78"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  export default firebase;


  
