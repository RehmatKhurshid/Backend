// importing packages
import express, { urlencoded } from 'express';
import { logger } from './utils/logger.js';
import { connectDB } from './utils/db/mongo.js';

import userRoutes from './routes/user/user.routes.js'
import blogRoutes from './routes/blog/blog.routes.js'
import multer from 'multer';

export const upload = multer({ dest : './public/data/uploads/' })

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const PORT = 4000;

//routes middleware
app.use('/api/v2', userRoutes);
app.use('/api/v3', blogRoutes);

// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any
//     console.log(req.file, req.body)
// });


//health check route
app.get('/healthcheck', (req, res) => {
    res.status(200).json({message : "server is up"})
})

app.listen(PORT, async() => {
    await connectDB();
    logger.info(`server is running on port ${PORT}`)
})