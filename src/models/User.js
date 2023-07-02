import mongoose from 'mongoose';
import { hashPassword } from '../utils/bcryptHash';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [50, 'Your name is too long, must be at most 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',

        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Maybe you forget the password'],
    },
}, {
    timestamps: true,
});

UserSchema.pre('save', async function () {
    try {
        const password = this.password;
        this.password = await hashPassword(password);
    } catch (err) {
        throw err;
    }
});

UserSchema.methods.createAccessToken = function () {
    const accessToken = jwt.sign({
        id: this._id,
        name: this.name,
    }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_LIFETIME });
    return accessToken;
}

const User = mongoose.model('User', UserSchema);

export default User;
