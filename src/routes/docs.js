import express from 'express';
import swaggerUI from 'swagger-ui-express';
import parseYAML from '../utils/parseYAML';

const router = express.Router();

const swaggerDocument = parseYAML('./swagger.yaml');

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

export default router;
