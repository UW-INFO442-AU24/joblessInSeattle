import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { TextEncoder, TextDecoder } from 'util';


const Login = () => {
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
            await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
            // POST request to backend to save the user's data
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userInfo.email,
                }),
            });

            if (response.ok) {
                setLoading(false);
                navigate('/dashboard');
            } else {
                setErr("Error saving user data");
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

    return(
        <div className="flex flex-col items-center justify-center border border-blue-600 rounded-[10px]">
            <h1 className="text-5xl font-semibold">Welcome to DayMax</h1>
            <p className="text-base">Your Health Journal. Your Health Buddy.</p>
            {/* if there's an error display it, otherwise display nothing */}
            {err && <p className="text-red-400">{err}</p>}
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        id="email" 
                        name="email"
                        value={userInfo.email} 
                        onChange={handleLoginChange}
                        placeholder="Email..." 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password" 
                        name="password"
                        value={userInfo.password}
                        onChange={handleLoginChange}
                        placeholder="Password..." 
                        required
                    />
                </div>
                <button type="submit" className="login">Log In</button>
                <p className="text-sm text-center mt-5">
                    Don't have an account?
                    <NavLink to="./Signup" className="underline">
                        Sign up
                    </NavLink>
                </p>
            </form>
            {loading && <div>Loading...Breath in, breath out...</div>}
        </div>
    );
}

export default Login;