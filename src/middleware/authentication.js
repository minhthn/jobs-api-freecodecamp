import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(createError(
            StatusCodes.UNAUTHORIZED,
            'It seem to be you are not authenticated'
        ));
    }
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, payload) => {
        if (err) {
            return next(createError(
                StatusCodes.UNAUTHORIZED,
                'It seem to be you are not authenticated'
            ));
        }
        const userId = payload.id;
        try {
            const user = await User.findById(userId).select('-password');
            // TODO: user maybe null
            req.user = user;
        } catch (err) {
            return next(err);
        }

        // attach user to request
        next();
    });
}

export default authentication;
