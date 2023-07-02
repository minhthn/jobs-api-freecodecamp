import Job from '../models/Job';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';

const jobsController = {

    // GET /api/v1/jobs
    getAllJobs: async(req, res, next) => {
        // get all jobs by author
        const user = req.user;
        try {
            const allJobs = await Job.find({ createdBy: user._id });
            res.status(StatusCodes.OK).json({
                message: 'Success',
                total: allJobs.length,
                jobs: allJobs,
            });
        } catch (err) {
            return next(err);
        }
    },

    // POST /api/v1/jobs
    createJob: async(req, res, next) => {
        const { company, position, status } = req.body;
        const user = req.user;
        try {
            const newJob = await Job.create({
                company,
                position,
                status,
                createdBy: user._id,
            });
            res.status(StatusCodes.CREATED).json({
                message: 'Job created',
                job: newJob
            });
        } catch (err) {
            return next(err);
        }

    },

    // GET /api/v1/jobs/:id
    getAJob: async(req, res, next) => {
        const jobId = req.params.id;
        const user = req.user;
        try {
            const job = await Job.findOne({
                _id: jobId,
                createdBy: user._id,
            });

            if (job == null) {
                return next(createError(
                    StatusCodes.NOT_FOUND,
                    `No such job with id ${jobId}`,
                ));
            }
            res.status(StatusCodes.OK).json({
                message: 'Success',
                job,
            });
        } catch (err) {
            return next(err);
        }
    },

    // PATCH /api/v1/jobs/:id
    updateJob: async(req, res, next) => {
        const { company, position, status, createdBy } = req.body;
        const jobId = req.params.id;
        const user = req.user;
        try {
            const updatedJob = await Job.findOneAndUpdate(
                { _id: jobId, createdBy: user._id },
                { company, position, status, createdBy },
                { new: true, runValidators: true, }
            );

            if (updatedJob == null) {
                return next(createError(
                    StatusCodes.NOT_FOUND,
                    `No such job with id ${jobId}`
                ));
            }
            res.status(StatusCodes.OK).json({
                message: 'Job updated',
                updatedJob,
            });
        } catch (err) {
            return next(err);
        }
    },

    // DELETE /api/v1/jobs/:id
    deleteJob: async(req, res, next) => {
        const jobId = req.params.id;
        const user = req.user;
        try {
            const deletedJob = await Job.findOneAndDelete({
                _id: jobId,
                createdBy: user._id
            });

            if (deletedJob == null) {
                return next(createError(
                    StatusCodes.NOT_FOUND,
                    `No such job with id ${jobId}`
                ));
            }
            res.status(StatusCodes.OK).json({
                message: 'Job deleted',
                deletedJob,
            });
        } catch (err) {
            return next(err);
        }
    },
};

export default jobsController;
