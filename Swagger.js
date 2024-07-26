import swaggerAutogen from 'swagger-autogen';
import { HOST } from './src/config/ServerConfig.js';

const doc = {
    info: {
        title: 'Blogging Platform API',
        description: 'API para una plataforma de blogging que permite la gestión de usuarios, roles, publicaciones, comentarios y categorías.'
    },
    host: HOST,
    servers: [
        {
            url: "http://localhost:3000/api/blog"
        }
    ]
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(async () => {
    await import('./src/index.js'); 
});
