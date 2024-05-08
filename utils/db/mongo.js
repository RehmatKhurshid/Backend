import mongoose from "mongoose";
import { logger } from "../logger.js";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/expressV2');

        logger.info('mongoose connected successfully!')
        
    } catch (error) {
        logger.error('something is wrong in mongoose connection')
    }
}