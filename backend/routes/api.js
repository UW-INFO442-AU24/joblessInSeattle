import express from 'express';

import usersRouter from './controllers/users.js';
import buddyRouter from './controllers/buddy.js';
import diaryRouter from './controllers/diary.js';
import sleepRouter from './controllers/sleep.js';
import waterRouter from './controllers/water.js';
import medicationRouter from './controllers/medication.js';
import loginRouter from './controllers/login.js';
import signupRouter from './controllers/signUp.js';
import resources from './controllers/resources.js';

var router = express.Router();

router.use('/users', usersRouter);
router.use('/buddy', buddyRouter);
router.use('/diary', diaryRouter);
router.use('/sleep', sleepRouter);
router.use('/water', waterRouter);
router.use('/medication', medicationRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/resources', resources);

export default router;