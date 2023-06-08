import express from 'express';
import Connection from './database/database.js';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

dotenv.config();

app.use(bodyParser.json({
    extended:true
}));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(cors());
app.use('/',router);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const PORT = 8000;

Connection(username,password);

app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`); 
});