import express from 'express';

import usersRouter from './controllers/users.js';
import buddyRouter from './controllers/buddy.js';
import healthCard from './controllers/healthCard.js';
import diaryRouter from './controllers/diary.js';
import sleepRouter from './controllers/sleep.js';
import waterRouter from './controllers/water.js';
import medicationRouter from './controllers/medication.js';

var router = express.Router();

router.use('/users', usersRouter);
router.use('/buddy', buddyRouter);
router.use('/healthCard', healthCard)
router.use('/diary', diaryRouter)
router.use('/sleep', sleepRouter)
router.use('/water', waterRouter)
router.use('/medication', medicationRouter)

export default router;