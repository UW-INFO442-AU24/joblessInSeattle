import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
// Parse the string into a JavaScript object
const serviceAccount = JSON.parse(serviceAccountString);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
export { auth };
