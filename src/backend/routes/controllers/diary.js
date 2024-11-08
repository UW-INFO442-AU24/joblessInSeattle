import express from 'express';
var router = express.Router();


// GET for /diary
router.get('/', async (req, res) => {
    try {
        // stuff
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// POST to /diary
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