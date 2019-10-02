 import firebase from 'firebase'
 import firestore from 'firebase/firestore'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAPMIJ5CKDii1SxORjYjmFRncA6W5_jqt0",
    authDomain: "udemy-geo-ninjas-726a9.firebaseapp.com",
    databaseURL: "https://udemy-geo-ninjas-726a9.firebaseio.com",
    projectId: "udemy-geo-ninjas-726a9",
    storageBucket: "",
    messagingSenderId: "370074649012",
    appId: "1:370074649012:web:de361f191bc06e4df8f2e1"
  };

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebaseApp.firestore().settings({ timestampsInSnapshots:true })
  export default firebaseApp.firestore()