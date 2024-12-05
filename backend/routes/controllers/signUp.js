import express from "express";

var router = express.Router();

// GET for /signup
router.get('/', async (req, res) => {
    try {
        console.log("it connected");
        res.status(200).json({ message: "Success!!" });
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});


router.post('/', async (req, res) => {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newUser = new req.models.User({
            fname : fname,
            lname : lname,
            email : email,
            password : password,
        });

        await newUser.save();
        res.status(201).json({ status: 'success', message: "User created", user: newUser })
    } catch(error) {
        // failed to create or save the new user or smt went wrong, so fail
        res.status(400).send({ message: 'Error during sign up', error: error.message });
    }
});

export default router;