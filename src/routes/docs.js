import express from 'express';
import swaggerUI from 'swagger-ui-express';
import parseYAML from '../utils/parseYAML';
import path from 'node:path';

const router = express.Router();

const swaggerDocument = parseYAML(path.join(__dirname, '..', '..', 'swagger.yaml'));

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

export default router;
