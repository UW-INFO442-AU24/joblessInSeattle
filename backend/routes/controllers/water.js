import express from 'express';
//import models from '../../models.js'
var router = express.Router();
//import bodyParser from "body-parser";


// GET water goals
router.get('/getGoal', async (req, res) => {
  try {
      // let username = req.query.username
      let userWaterGoals = await req.models.WaterStats.find({entryType: 'setGoal'}) //find({username: username});
      let waterGoal = await Promise.all(
        userWaterGoals.map(async goal => {
        try {
          let {date, waterGoal, entryType} = goal;
          return {date, waterGoal, entryType};
        }
        catch(error) {
          console.log("Error: ", error);
          return(type, error);
        }
      }));
      res.send(waterGoal);
    }
    catch(error) {
      console.log("Error: ", error);
      res.status(500).json({status: "error", error: error});
    }
});

// GET water intake
router.get('/getWaterIntake', async (req, res) => {

  let today = new Date();
  let todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

try {
    // let username = req.query.username
    let userWaterIntakes = await req.models.WaterStats.find({entryType: 'intake', date: todayDate}) //find({username: username});
    let waterIntake = await Promise.all(
      userWaterIntakes.map(async intake => {
      try {
        let {date, water, entryType} = intake;
        return {date, water, entryType};
      }
      catch(error) {
        console.log("Error: ", error);
        return(type, error);
      }
    }));
    res.send(waterIntake);
  }
  catch(error) {
    console.log("Error: ", error);
    res.status(500).json({status: "error", error: error});
  }
});

// POST to /water
router.post('/', async (req, res) => {

  let date = new Date();
  let dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    try {
      const newWater = new req.models.WaterStats({
        date: dateWithoutTime,
        water : req.body.water,
        entryType: 'intake'
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

router.post('/goals', async (req, res) => {
  try {
    const newWater = new req.models.WaterStats({
      date: Date.now(),
      waterGoal: req.body.waterGoal,
      entryType: 'setGoal'
    });
    console.log("this is before the goal is saved");
    await newWater.save()
    console.log("this is after the goal is saved")
    res.json({"status" : "success"})
  }
  catch(error) {
    console.log("error: ", error);
    res.status(500).json({status: "error", error: error});
  }
});
  
export default router;