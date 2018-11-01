import * as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBgm--q-b74CmqJ-NwoquQPZXoX01K7f78",
    authDomain: "chatfirebase-c235f.firebaseapp.com",
    databaseURL: "https://chatfirebase-c235f.firebaseio.com",
    projectId: "chatfirebase-c235f",
    storageBucket: "chatfirebase-c235f.appspot.com",
    messagingSenderId: "238472280389"
};
export const FirebaseApp = firebase.initializeApp(config);
export const database = firebase.database().ref('posts/');
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();