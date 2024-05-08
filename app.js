// importing packages
import express, { urlencoded } from 'express';
import { logger } from './utils/logger.js';
import { connectDB } from './utils/db/mongo.js';

import userRoutes from './routes/user/user.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded())


const PORT = 4000

//routes middleware
app.use('/api/v2', userRoutes);

//health check route
app.get('/healthcheck', (req, res) => {
    res.status(200).json({message : "server is up"})
})

app.listen(PORT, async() => {
    await connectDB();
    logger.info(`server is running on port ${PORT}`)
})