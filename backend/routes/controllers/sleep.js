import express from 'express';
// moved this above the router; import auth because that's what's in the firebase.js
import { auth } from '../../firebase.js';

var router = express.Router();

// GET goals
router.get('/getGoal', async (req, res) => {
    try {
        // not needed now bc its not client side
        // const auth = getAuth();
        // const user = auth.currentUser;

        // have to get the user id through firebase admin SDK and not client side SDK
        const idToken = req.headers.authorization?.split('Bearer ')[1]; // fully just googled how?
        
        if (!idToken) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const verifiedToken = await auth.verifyIdToken(idToken);
        const userId = verifiedToken.uid;

        // if (userId) {
        let userSleepGoals = await req.models.SleepStats.find({ user_id: userId, entryType: 'setGoal' });
        let sleepGoal = await Promise.all(
            userSleepGoals.map(async goal => {
                try {
                    let { sleepGoalHour, sleepGoalMin, entryType, user_id } = goal;
                    return { sleepGoalHour, sleepGoalMin, entryType, user_id };
                } catch(error) {
                    console.log("Error: ", error);
                }
            })
        );

        res.send(sleepGoal);
    } catch(error) {
        console.log("Error: ", error);
        res.status(500).json({ status: "error", error: error });
    }
});

// GET inputted time
router.get('/getTimeInputs', async (req, res) => {
  try {
      const idToken = req.headers.authorization?.split('Bearer ')[1]; // fully just googled how?
        
      if (!idToken) {
        return res.status(401).json({ error: 'No token provided' });
      } 

      const verifiedToken = await auth.verifyIdToken(idToken);
      const userId = verifiedToken.uid;
      let userSleepTimes = await req.models.SleepStats.find({user_id: userId, entryType: 'recordTime'});
      let sleepTime = await Promise.all(
        userSleepTimes.map(async time => {
        try {
          let {bedTime, wakeTime, entryType, user_id} = time;
          return {bedTime, wakeTime, entryType, user_id};
        }
        catch(error) {
          console.log("Error: ", error);
          // return(type, error);
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