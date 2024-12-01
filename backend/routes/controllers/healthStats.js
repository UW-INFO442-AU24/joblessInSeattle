import express from 'express';
// import { DailyStats } from '../../models.js';
import models from '../../models.js'
var router = express.Router();

// GET for /healthCard
router.get('/', async (req, res) => {
    const DailyStats = models.DailyStats;
    try {
        // fetching the data from the dailystats table, sorted by date
        const healthData = await DailyStats.find().sort({ date: -1 });
        res.status(200).json(healthData);
    } catch(error) {
        console.log("Error fetching health statistics: ", error);
        res.status(500).json({ status: "error", message: 'Failed to get health statistics', error: error });
    }
});

// POST to /healthCard
router.post('/', async (req, res) => {
    try {
        // defining required inputs for message error
        const requiredFields = ['user_id', 'water', 'sleep', 'heart_rate'];
        // takes the data from the user input
        const { user_id, water, sleep, heart_rate, meds } = req.body;
        // for whichever field that isn't filled in, return err msg abt that field
        for (let required of requiredFields) {
            if (req.body[required] === undefined) {
                return (res.status(400).json({
                    status: 'error',
                    message: `Missing Required Field. Please provide ${required}.`
                }));
            }
        }
        // Sets the current date and time, so we can post it w/o user inputting
        const date = new Date();

        // new Daily Stats entry
        const newDailyStats = new DailyStats({
            date,
            user_id,
            water,
            sleep,
            heart_rate,
            meds
        });

        await newDailyStats.save();
        res.status(201).json({ status: 'success', message: "Health statistics saved", data: newDailyStats })
    } catch(error) {
        console.log("error: ", error);
        res.status(500).json({ status: "error", message: 'Failed to update daily statistics entries', error: error });
    }
});
  
export default router;