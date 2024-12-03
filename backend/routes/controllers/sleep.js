import express from 'express';
var router = express.Router();


// GET for /sleep
router.get('/', async (req, res) => {
    try {
        // stuff
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// POST to /sleep
router.post('/', async (req, res) => {
  try {
    const newSleep = new req.models.SleepStats({
      bedTime: req.body.bedTime,
      wakeTime: req.body.wakeTime
    });
    console.log("this is before the save");
    await newSleep.save();
    console.log(req.body.bedTime);
    console.log("this is after the save");
    res.json({"status" : "success"});
  }
  catch(error) {
    console.log("error: ", error);
    res.status(500).json({status: "error", error: error});
  }
});

// POST to /sleep/goals
router.post('/goals', async (req, res) => {
    try {
      const newSleep = new req.models.SleepStats({
        sleepGoalHour: req.body.sleepGoalHour,
        sleepGoalMin: req.body.sleepGoalMin
      });
      console.log("this is before the goal is saved");
      await newSleep.save()
      console.log("this is after the goal is saved")
      res.json({"status" : "success"})
    }
    catch(error) {
      console.log("error: ", error);
      res.status(500).json({status: "error", error: error});
    }
});
  
export default router;