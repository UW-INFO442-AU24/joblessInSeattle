import express from 'express';
var router = express.Router();


// GET for /users
router.get('/', async (req, res) => {
    try {
        // stuff
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// POST to /users
router.post('/', async (req, res) => {
    try {
      // stuff
    }
    catch(error) {
      console.log("error: ", error);
      res.status(500).json({status: "error", error: error});
    }
});
  
export default router;