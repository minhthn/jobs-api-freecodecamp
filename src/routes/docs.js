import express from 'express';
import swaggerUI from 'swagger-ui-express';
import parseYAML from '../utils/parseYAML';
import path from 'node:path';

const router = express.Router();

const swaggerDocument = parseYAML(path.join(__dirname, '..', '..', 'swagger.yaml'));
const swaggerOptions = {
    customCssUrl: '/css/swagger-ui.css'
};

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument, swaggerOptions));

export default router;
