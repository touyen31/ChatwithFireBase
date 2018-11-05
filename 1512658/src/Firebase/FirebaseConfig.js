import * as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBgm--q-b74CmqJ-NwoquQPZXoX01K7f78",
    authDomain: "chatfirebase-c235f.firebaseapp.com",
    databaseURL: "https://chatfirebase-c235f.firebaseio.com",
    projectId: "chatfirebase-c235f",
    storageBucket: "chatfirebase-c235f.appspot.com",
    messagingSenderId: "238472280389"
};
const FirebaseApp = firebase.initializeApp(config);
export  default  FirebaseApp;