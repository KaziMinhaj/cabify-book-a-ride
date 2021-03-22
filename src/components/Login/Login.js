import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import './Login.css'

const Login = () => {
    //states
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: false
    })

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

    //email and pass sign up and sign in
    const handleSubmit = (event) => {
        event.preventDefault()
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    updateUserName(user.name)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
    }
    //handle blur
    const handleBlur = (event) => {
        let isFormValid = true;
        console.log(event.target.value, event.target.name);
        if (event.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === "password") {
            const isPassValid = event.target.value.length > 6
            const passContainNumber = /\d{1}/.test(event.target.value)
            isFormValid = (isPassValid && passContainNumber);
        }
        if (isFormValid) {
            //copy user state value
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            console.log("name::", event.target.value);
            setUser(newUserInfo)
        }
    }

    const updateUserName = (name) => {
        console.log("updateUserName", name);
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // Update successful.
            console.log('update successfully');
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }


    return (
        <div className="form-container">
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <h3>Please sign in to Cabify</h3>
                    <br />
                    {newUser && <input type="text" name="name" placeholder="name" onBlur={handleBlur} />}
                    <br />
                    <input type="text" name="email" placeholder="email" onBlur={handleBlur} required />
                    <br />
                    <input type="password" name="password" placeholder="password" onBlur={handleBlur} required />
                    <br />

                    <input className="btn btn-primary signinoutbtn" type="submit" value={newUser ? 'sign up' : 'sign in'} />
                    <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
                    <label htmlFor="newUser">signup</label>
                </form>
            </div>
            <h5>or</h5>
            <div>
                <button className="btn btn-success" onClick={handleGoogleSignIn}>Google Sign in</button>
            </div>
            {console.log('user', user, 'newUser', newUser)
            }
        </div>
    );
};

export default Login;