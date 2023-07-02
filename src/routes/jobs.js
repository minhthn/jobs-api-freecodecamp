import express from 'express';
import jobsController from '../controllers/jobs';

const router = express.Router();

router.get('/', jobsController.getAllJobs);
router.post('/', jobsController.createJob);
router.get('/:id', jobsController.getAJob);
router.patch('/:id', jobsController.updateJob);
router.delete('/:id', jobsController.deleteJob);

export default router;
