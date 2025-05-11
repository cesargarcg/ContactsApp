import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ContactRouter from './src/routes/ContactRouter.js';
import bodyParser from 'body-parser';

const server = express();
const cs = cors();

server.use(cs);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/contacts',ContactRouter);

try{
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}catch(e){
    console.error('Error starting server: ', e);
}