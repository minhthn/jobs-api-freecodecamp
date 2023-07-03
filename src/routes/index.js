import express from 'express';
import authRouter from './auth';
import jobsRouter from './jobs';
 import authentication from '../middleware/authentication';


const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Visit /api/v1/auth and /api/v1/jobs');
});
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/jobs', authentication, jobsRouter);

export default router;
