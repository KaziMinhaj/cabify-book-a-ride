import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';

const Login = () => {
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    //Custom methods
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        //sign in with popup
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                console.log(user);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    return (
        <div>

            <button className="btn btn-success" onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;