import express from "express";
import admin from "firebase-admin";

var router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Authenticating the user with Firebase by getting their email
        const userCreds = await admin.auth().getUserByEmail(email);
        const firebaseUid = userCreds.user.uid;
        // correct authentication creds so successful
        res.status(200).send({ message: "authentication successful", uid: firebaseUid });
    } catch(error) {
        // failed to authenticate or smt went wrong, so fail
        res.status(400).send({ message: 'authentication failed', error: error.message });
    }
});

export default router;