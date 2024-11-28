import express from 'express';
var router = express.Router();


// GET for /buddy
router.get('/', async (req, res) => {
    try {
        // get buddy emotion based on health input
        const emotion = "";
      } catch(error) {
        console.log("Error: ", error);
        res.status(500).json({ status: "error", message: "Failed to get buddy's health status and emotions", error: error });
      }
});

// POST to /buddy
router.post('/', async (req, res) => {
    try {
      // stuff
    }
    catch(error) {
      console.log("error: ", error);
      res.status(500).json({ status: "error", message: "Failed to update buddy's health status and emotions", error: error });
    }
});
  
export default router;