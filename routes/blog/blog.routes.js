import express from 'express';
import { isAdmin, isAuthenticated } from '../../middlewares/validation/user.middleware.js';
import { createBlog, deleteBlog, getallBlog, updateBlog, } from '../../controllers/blog/blog.controller.js';
import multer from 'multer';

const router = express.Router();
router.get('/', getallBlog)

const upload = multer({ dest: './public/data/uploads/blog' })
router.post('/blog', isAuthenticated, upload.single('imageUrl'), createBlog);

router.put('/blog/:id', isAuthenticated, updateBlog);

router.delete('/blog/:id', isAuthenticated, deleteBlog);

export default router
