import express from 'express';
//import models from '../../models.js'
var router = express.Router();
//import bodyParser from "body-parser";


// GET for /water
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

// POST to /water
router.post('/', async (req, res) => {
    //const WaterStats = models.WaterStats;
    try {
      const newWater = new req.models.WaterStats({
        //date: Date.now(),
        water : req.body.water,
      });
      console.log("this is before the save");
      await newWater.save()
      console.log(req.body.water)
      console.log("this is after the save")
      res.json({"status" : "success"})
    }
    catch(error) {
      console.log("error: ", error);
      res.status(500).json({status: "error", error: error});
    }
});
  
export default router;