import express from 'express';
// import { Diary } from '../../models.js';
import models from '../../models.js';

var router = express.Router();

// GET for /diary
router.get('/', async (req, res) => {
    const Diary = models.Diary;
    try {
        // fetch all the data and sort by most recent date
        const entries = await Diary.find().sort({ date: -1 });
        // return the user entries as JSON
        res.status(200).json(entries);
    } catch(error) {
        console.log("Error fetching diary entries:: ", error);
        res.status(500).json({ status: "error", message: 'Failed to get diary entries', error: error });
    }
});

// POST to /diary
router.post('/', async (req, res) => {
    try {
        // Get the entries and date are coming from the request body
        const { entry, date } = req.body;
        // Validate the input
        if (!entry || entry.trim() === '') {
          return res.status(400).json({ status: 'error', message: 'Entry cannot be empty' });
        }
        const newEntry = new Diary({
          entry,
          date: date || new Date(), // Use the provided date or default to the current date
        });
        
        await newEntry.save();
        res.status(201).json({ status: 'success', message: 'Diary entry saved successfully', newEntry });
    } catch(error) {
        console.log("Error saving journal entry: ", error);
        res.status(500).json({ status: "error", message: 'Failed to save diary entry', error: error });
    }
});
  
export default router;