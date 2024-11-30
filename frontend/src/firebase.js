import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjYRvRQyyjJORIqi-wFtsZOD45sPesaOo",
  authDomain: "daymax-86edc.firebaseapp.com",
  projectId: "daymax-86edc",
  storageBucket: "daymax-86edc.appspot.com",
  messagingSenderId: "1076553295004",
  appId: "1:1076553295004:web:7d726d496f81062e277959"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
<<<<<<< HEAD:frontend/src/firebase.js
export const auth = getAuth(app);
export default app;
=======
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App auth={auth} />
  </React.StrictMode>
);
>>>>>>> c9a587780c4bbb025616329f808ec714343fb68f:src/backend/index.js
