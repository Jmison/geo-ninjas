import firebase from "firebase";
import firestore from "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJ5CQEMNH7ov7KqTdDOznNyK9gcyQwLLU",
  authDomain: "udemy-ninja-smoothies-7fd9c.firebaseapp.com",
  databaseURL: "https://udemy-ninja-smoothies-7fd9c.firebaseio.com",
  projectId: "udemy-ninja-smoothies-7fd9c",
  storageBucket: "udemy-ninja-smoothies-7fd9c.appspot.com",
  messagingSenderId: "834159067466",
  appId: "1:834159067466:web:49f555a1dc6b7a2b"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true }); // gets rid of error in colse (allegedly)

// export firebase database (so later on we can import it)
export default firebaseApp.firestore();
