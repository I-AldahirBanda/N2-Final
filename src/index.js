import express from 'express';
import { HOST, PORT } from './config/ServerConfig.js';
import { router } from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };

const app = express();
app.use(express.json());

app.use('/api/v1', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
});
