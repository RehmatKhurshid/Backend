import express from 'express';
import { isAuthenticated } from '../../middlewares/validation/user.middleware.js';

const router = express.Router();

router.post('/blog', isAuthenticated, )


export default router
