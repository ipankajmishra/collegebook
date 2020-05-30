import firebase from 'firebase'

const config={
    apiKey: "AIzaSyBIsNXRI7p6bsFUOBSF1RQswEB6H3H-iVY",
    authDomain: "collegebook-2ffc0.firebaseapp.com",
    databaseURL: "https://collegebook-2ffc0.firebaseio.com",
    projectId: "collegebook-2ffc0",
    storageBucket: "collegebook-2ffc0.appspot.com",
    messagingSenderId: "724371346994",
    appId: "1:724371346994:web:6bf849bd650dcef14cce2b",
    measurementId: "G-2F4931MXL8"
}

firebase.initializeApp(config);
export default firebase