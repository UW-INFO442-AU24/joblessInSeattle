import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';


export default function Login() {
    const apiUrl = "https://joblessinseattlefe.onrender.com";
    // naviagtes users to dashboard after login
    const navigate = useNavigate();
    // setting and saving error msgs to display to users
    const [err, setErr] = useState("");
    // setting and saving loading status
    const [loading, setLoading] = useState(false);

    // setting and saving the user login info
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    // This handles the input errors when users log in
    // Ensures users input a valid email and pwd or throws errors otherwise
    const handleValidation = (input) => {
        const errors = {};

        if (!input.email) {
            errors.email = "Email is required";
        // this is formatting so that the email is a valid email and not something
        // random or a javascript hack
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.email)) {
            errors.email = "Invalid Email address";
        }

        if (!input.password) {
            errors.password = "Password is required";
        } else if (input.password.length <= 7) {
            errors.password = "Password length must be greater than 8";
        }

        return errors;
    };

    // handles the form input changes
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    // handle form submissions from the users
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);

        // validate inputs
        const errors = handleValidation(userInfo);
        console.log(errors);

        if (Object.keys(errors).length > 0) {
            setErr(errors.email || errors.password);
            setLoading(false);
            return;
        }

        // log in attempt
        try {
            // FIrebase auth
            const userCredentials = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
            const user = userCredentials.user;

            // Get the Firebase ID token
            const idToken = await user.getIdToken();
            
            // POST request to backend to save the user's data
            const response = await fetch("https://joblessinseattle.onrender.com/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (response.ok) {
                setLoading(false);
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                console.error(errorData); // Log the error to the console
                setErr(errorData.message || "Error saving user data");
            }
        } catch(err) {
            setLoading(false);

            console.log(err.code);
            // general firebase error codes that we could encounter
            if (err.code === 'auth/wrong-password') {
                setErr("Incorrect password. Please try again.");
            } else if (err.code === 'auth/user-not-found') {
                setErr("No user found with this email.");
            } else if (err.code === 'auth/invalid-email') {
                setErr("Invalid email address.");
            } else if (err.code === 'auth/network-request-failed') {
                setErr("Network error. Please check your internet connection.");
            } else {
                setErr("Login failed. Please double-check and try again.");
            }

            console.log(err.message);
        }
    }

    return (
        <div className="w-full max-w-xs">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h1 className="text-4xl font-semibold m-4 text-center">Welcome to DayMax</h1>
                <p className="text-center m-2">Your Health Journal.</p>
                <p className="text-center mx-2 mb-20">Your Health Buddy.</p>
                {/* if there's an error display it, otherwise display nothing */}
                {err && <p className="text-red-400">{err}</p>}
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email:</label>
                    <input 
                        type="email"
                        id="email" 
                        name="email"
                        value={userInfo.email} 
                        onChange={handleLoginChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
                        placeholder="john@gmail.com" 
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password: </label>
                    <input
                        type="password"
                        id="password" 
                        name="password"
                        value={userInfo.password}
                        onChange={handleLoginChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
                        placeholder="Password" 
                        required
                    />
                </div>
                <button type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
                <p className="text-sm text-center mt-5">
                    Don't have an account? {" "}
                    <NavLink to="../Signup" className="underline">
                        Sign up
                    </NavLink>
                </p>
            </form>
            {loading && <div>Loading...Breath in, breath out...</div>}
        </div>
    );
}
