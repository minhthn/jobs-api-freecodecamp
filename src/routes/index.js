import express from 'express';
import authRouter from './auth';
import jobsRouter from './jobs';
import docsRouter from './docs';
import authentication from '../middleware/authentication';


const router = express.Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/jobs', authentication, jobsRouter);
router.use('/api/v1/docs', docsRouter);

export default router;
