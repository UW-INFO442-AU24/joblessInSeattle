import express from "express";
import { auth } from '../../firebase.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).send({ message: "ID token is missing" });
    }

    try {
        const decodeToken = await auth.verifyIdToken(idToken);
        const user = decodeToken;
        // correct authentication creds so successful
        res.status(200).send({ message: "authentication successful", uid: user.uid, email: user.email });
    } catch(error) {
        // failed to authenticate or smt went wrong, so fail
        res.status(400).send({ message: 'authentication failed', error: error.message });
    }
});

export default router;