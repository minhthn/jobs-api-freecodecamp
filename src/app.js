import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'node:path';

import * as db from './db/connect';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';

// additional security packages
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3030

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// security middleware
app.use(rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 50, // Limit each IP to 50 requests per `windowMs` (i.e. 20 minutes),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
}));
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(routes);

// middleware handler
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await db.connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`App is running at http://localhost:${port}`);
        });
    } catch (err) {
        throw err;
    }
}

start();
