import express from 'express';
var router = express.Router();


// GET for /healthCard
router.get('/', async (req, res) => {
    try {
        // stuff
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// POST to /healthCard
router.post('/', async (req, res) => {
    try {
      // stuff
    }
    catch(error) {
      console.log("error: ", err);
      res.status(500).json({status: "error", error: error});
    }
});
  
export default router;