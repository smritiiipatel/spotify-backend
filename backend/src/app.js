import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import router from '../route/routes.js';
import musicRouter from '../route/musicroute.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",router);
app.use("/api/music", musicRouter);


export default app;