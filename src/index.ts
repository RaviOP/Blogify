import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });
import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import './connection/mongodb'
import { userRoutes } from './routes/userRoutes';
import { categoryRoutes } from './routes/categoryRoutes';
import { articleRoutes } from './routes/articleRoutes';

const app = express();

const rootDirectory = path.resolve();
app.use('/uploads', express.static(path.join(rootDirectory, '/uploads')));
app.use(cors());
app.use(express.json());
app.use(morgan('combined'))

app.use(userRoutes)
app.use(categoryRoutes)
app.use(articleRoutes)

const PORT = process.env.PORT || 3097;

app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));