import express from 'express';
import multer from 'multer';
import { loginUserValidator, registerUserValidator } from '../../middlewares/validation/user.validator.js';
import { getallUser, loginUser, registerUser } from '../../controllers/user/user.controller.js';

const router = express.Router();
const upload = multer({ dest : './public/data/uploads/user' })

router.post('/signup',registerUserValidator,upload.single('profilePic'),registerUser );
router.get('/', getallUser)
router.post('/signin',loginUserValidator, loginUser );

export default router

