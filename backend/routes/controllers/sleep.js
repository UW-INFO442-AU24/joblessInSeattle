import express from 'express';
var router = express.Router();


// GET goals
router.get('/getGoal', async (req, res) => {
    try {
        // let username = req.query.username
        let userSleepGoals = await req.models.SleepStats.find({entryType: 'setGoal'}) //find({username: username});
        let sleepGoal = await Promise.all(
          userSleepGoals.map(async goal => {
          try {
            let {sleepGoalHour, sleepGoalMin, entryType} = goal;
            return {sleepGoalHour, sleepGoalMin, entryType};
          }
          catch(error) {
            console.log("Error: ", error);
            return(type, error);
          }
        }));
        res.send(sleepGoal);
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// GET inputted time
router.get('/getTimeInputs', async (req, res) => {
  try {
      // let username = req.query.username
      let userSleepTimes = await req.models.SleepStats.find({entryType: 'recordTime'}) //find({username: username});
      let sleepTime = await Promise.all(
        userSleepTimes.map(async time => {
        try {
          let {bedTime, wakeTime, entryType} = time;
          return {bedTime, wakeTime, entryType};
        }
        catch(error) {
          console.log("Error: ", error);
          return(type, error);
        }
      }));
      res.send(sleepTime);
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
      wakeTime: req.body.wakeTime,
      entryType: 'recordTime'
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
        sleepGoalMin: req.body.sleepGoalMin,
        entryType: 'setGoal'
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