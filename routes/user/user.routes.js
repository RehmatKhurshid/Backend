import express from 'express';
import { loginUserValidator, registerUserValidator } from '../../middlewares/validation/user.validator.js';
import { loginUser, registerUser } from '../../controllers/user/user.controller.js';

const router = express.Router();

router.post('/signup',registerUserValidator, registerUser );

router.post('/signin',loginUserValidator, loginUser );

export default router