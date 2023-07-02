import User from '../models/User';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { isMatchPassword } from '../utils/bcryptHash';

const authController = {

    // POST /api/v1/auth/register
    registerUser: async (req, res, next) => {
        const { name, email, password } = req.body;

        try {
            // note: duplicate email is handled in errorHandler middleware
            const newUser = await User.create({ name, email, password });
            res.status(StatusCodes.CREATED).json({
                messasge: 'User created',
                user: newUser
            });
        } catch (err) {
            return next(err);
        }
    },

    // POST /api/v1/auth/login
    loginUser: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return next(createError(StatusCodes.NOT_FOUND, 'Wrong email or password'));
            }
            const isMatch = await isMatchPassword(password, user.password);
            if (!isMatch) {
                return next(createError(StatusCodes.NOT_FOUND, 'Wrong email or password'));
            }

            const accessToken = user.createAccessToken();
            res.status(StatusCodes.OK).json({
                message: 'Login successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                accessToken,
            });
        } catch (err) {
            return next(err);
        }

    },
};

export default authController;
