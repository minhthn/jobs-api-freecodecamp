import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const JobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Please provide company'],
        maxLength: 100,
    },
    position: {
        type: String,
        maxLength: 100,
        required: [true, 'Position cannot be empty'],
    },
    status: {
        type: String,
        lowercase: true,
        enum: {
            values: ['interview', 'intern', 'pending'],
            message: 'Status `{VALUE}` is not supported',
        },
        trim: true,
        default: 'pending',
    },
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'Please provide the author'],
    }
}, {
    timestamps: true,
});
const Job = mongoose.model('Job', JobSchema);

export default Job;
