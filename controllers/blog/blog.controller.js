import Blog from "../../models/blog/blog.model.js";
import { logger } from "../../utils/logger.js";

export const createBlog = async (req, res, next) => {
    try {

        console.log('req.file', req.file);
        console.log('req.body', req.body);


        const { title, description, imageUrl, comment, likeCount } = req.body;



        const blog = new Blog({
            title,
            description,
            imageUrl: (req.file && req.file.path) ? req.file.path : undefined,
            comment,
            likeCount,
            user: req.user._id
        })

        await blog.save()
        res.status(201).json({ "message": "blog created succesfully" })
    } catch (error) {
        console.log(error)
        console.log('inside blog controller')
        logger.error(`error in createBlog : ${JSON.stringify(error)}`)
        res.status(401).json({ "message": "something went wrong" })

    }
}


export const getallBlog = async (req, res) => {
    try {
        const data = await Blog.find();
        console.log(data);
        res.status(200).json(data)

    } catch (error) {
        console.log(error)

    }
}






export const updateBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        console.log('blogId', blogId);
        const userId = req.user._id;
        console.log('userid', userId);

        const blog = await Blog.findById(blogId);

        console.log('blog', blog);

        if (!blog) {
            return res.status(404).json({ "message": "Blog not found" });
        }
        // Check if the user making the request is the owner of the blog
        if (blog.user._id.toString() !== userId.toString()) {
            return res.status(403).json({ "message": "You are not authorized to update this blog" });
        }

        const { title, description, imageUrl, comment, likeCount } = req.body;

        blog.title = title;
        blog.description = description;
        blog.imageUrl = imageUrl;
        blog.comment = comment;
        blog.likeCount = likeCount;

        await blog.save();

        res.status(200).json({ "message": "Blog updated successfully" });
        next();
    } catch (error) {
        console.log(error)
        logger.error(`Error in updateBlog: ${JSON.stringify(error)}`);
        res.status(500).json({ "message": "Something went wrong" });
    }
};








export const deleteBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        console.log('blogId', blogId);
        const userId = req.user._id;
        console.log('userid', userId);

        const blog = await Blog.findById(blogId);

        console.log('blog', blog);

        if (!blog) {
            return res.status(404).json({ "message": "Blog not found" });
        }
        // Check if the user making the request is the owner of the blog
        if (blog.user._id.toString() !== userId.toString()) {
            return res.status(403).json({ "message": "You are not authorized to delete this blog" });
        }

        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({ "message": "Blog deleted successfully" });
        next();
    } catch (error) {
        console.log(error)
        logger.error(`Error in updateBlog: ${JSON.stringify(error)}`);
        res.status(500).json({ "message": "Something went wrong" });
    }
};


