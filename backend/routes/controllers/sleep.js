import express from 'express';
var router = express.Router();
import { getAuth } from '../firebase.js';

// GET goals
router.get('/getGoal', async (req, res) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          let userSleepGoals = await req.models.SleepStats.find({user_id: user.uid, entryType: 'setGoal'}) //find({username: username});
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
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// GET inputted time
router.get('/getTimeInputs', async (req, res) => {
  try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        let userSleepTimes = await req.models.SleepStats.find({user_id: user.uid, entryType: 'recordTime'}) //find({username: username});
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
      user_id: req.body.user_id,
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
        user_id: req.body.user_id, 
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