import express from 'express';
import 'express-async-errors';
import path from 'path'; 
import cors from 'cors';

import routes from './routes';
import errorHandler from './errors/handler';

import { connectDb } from './database/connection';

const PORT = 3333;
const HOST = '0.0.0.0'

connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(PORT, HOST);