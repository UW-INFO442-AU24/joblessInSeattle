import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState("");

    // setting and saving the user login info for the first time
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    // This handles the input errors when users sign up
    // Ensures users input a valid email and pwd or throws errors otherwise
    const handleValidation = (input) => {
        const errors = {};

        if (!input.name) {
            errors.name = "Name is required";
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
            setErr(errors.name || errors.email || errors.password);
            setLoading(false);
            return;
        }
        // sign up attempt
        try {
            // FIrebase auth
            await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);

                // still need to figure out how to connect and save it
                // to the user model
                // ???????? HELP ????????????????
                // dek if i did this right pls work

            // POST request to backend to save the user's data
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userInfo.name,
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

    useEffect(() => {
        fetch('http://localhost:3001/api/signup')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            setApiResponse(data);
        })
        .catch((error) => {
            setErr(error.message);
        })
    }, []);

    return(
        <div>
            {/* form set up frontend */}
        </div>
    );
}

export default Signup;