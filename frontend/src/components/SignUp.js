import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

export default function Signup() {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    // setting and saving the user login info for the first time
    const [userInfo, setUserInfo] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });

    // This handles the input errors when users sign up
    // Ensures users input a valid email and pwd or throws errors otherwise
    const handleValidation = (input) => {
        const errors = {};

        if (!input.fname) {
            errors.fname = "First name is required";
        } else if (!input.lname) {
            errors.lname = "Last name is required";
        }

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
    const handleSignUpChange = (e) => {
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
            setErr(errors.fname || errors.lname || errors.email || errors.password);
            setLoading(false);
            return;
        }
        // sign up attempt
        try {
            // FIrebase auth
            await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
            console.log(userInfo.fname)
            console.log(userInfo.lname)
            console.log(userInfo.email)
            console.log(userInfo.password)

            // POST request to backend to save the user's data
            const response = await fetch('http://localhost:3001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fname: userInfo.fname,
                    lname: userInfo.lname,
                    email: userInfo.email,
                    password: userInfo.password
                }),
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
            if (err.code === "auth/email-already-in-use") {
                setErr("This email is already in use. Please use a different email address.");
            } else if (err.code === "auth/weak-password") {
                setErr("Weak password. Password must be at least 7 characters long.");
            } else if (err.code === "auth/invalid-email") {
                setErr("Invalid email address. Please enter a valid email.");
            } else if (err.code === "auth/missing-email") {
                setErr("Email is required.");
            } else {
                setErr("Sign up failed. Please double-check and try again.");
            }

            console.log(err.message);
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="">
                    {/* first name portion */}
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            value={userInfo.fname}
                            onChange={handleSignUpChange}
                            className=""
                            placeholder="John"
                            required
                        />
                    </div>

                    {/* last name portion */}
                    <div className="mb-4">
                        <label htmlFor="lname" className="block text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            value={userInfo.lname}
                            onChange={handleSignUpChange}
                            className=""
                            placeholder="Doe"
                            required
                        />
                    </div>

                    {/* email portion */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleSignUpChange}
                            className=""
                            placeholder="mynameisJohn@gmail.com"
                            required
                        />
                    </div>
                    
                    {/* password portion */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleSignUpChange}
                            className=""
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {err && <p className="text-red-500 text-sm">{err}</p>}

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className=""
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                {/* login option redirect */}
                <div className="mt-4 text-center">
                    <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a></p>
                </div>
            </div>
        </div>
    );
}