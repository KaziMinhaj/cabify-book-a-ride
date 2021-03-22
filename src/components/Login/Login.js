import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import './Login.css'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    //for redirecting
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    //context api
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    //states
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        confirmPassword: '',
        isPassConfirmed: false,
        successText: ''
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
                var { displayName } = result.user;
                const signedUser = { name: displayName }
                // console.log(user);
                setLoggedInUser(signedUser);
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUserInfo = { ...user };
                    newUserInfo.password === newUserInfo.confirmPassword ? newUserInfo.isPassConfirmed = true : newUserInfo.isPassConfirmed = false
                    if (newUserInfo.isPassConfirmed) {
                        newUserInfo.error = '';
                        newUserInfo.success = true;
                        newUserInfo.successText = "Congratulations! Your account has been created. Please LOGIN"
                        setUser(newUserInfo)
                        updateUserName(user.name);
                    }
                    else {
                        newUserInfo.error = "Password is not matching ! Please try again";
                        newUserInfo.success = false;
                        setUser(newUserInfo)

                    }
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
                    const globalnewUserInfo = { ...user }
                    setLoggedInUser(globalnewUserInfo);
                    history.replace(from);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo)
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
        if (event.target.name === "password" || event.target.name === "confirmPassword") {
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
                    {newUser && <input type="password" name="confirmPassword" placeholder="confirm password" onBlur={handleBlur} />}
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
            <h5 style={user.error ? { color: 'green' } : { color: 'green' }} >{user.error ? user.error : user.successText} </h5>

        </div>
    );
};

export default Login;