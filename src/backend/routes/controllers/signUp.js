import express from "express";
import admin from "firebase-admin";
import { User } from "../../models.js"; 

var router = express.Router();

// // initialize Firebase Admin, connects the backend to Firebase
// admin.initializeApp();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // this creates the user in firbase
        const userCreds = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json({ status: 'success', message: "User created", user: newUser })
    } catch(error) {
        // failed to create or save the new user or smt went wrong, so fail
        res.status(400).send({ message: 'Error during sign up', error: error.message });
    }
});

export default router;