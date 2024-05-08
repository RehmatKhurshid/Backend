import Blog from "../../models/blog/blog.js";
export const createBlog = async (req, res, next) => {
    try {
        const { title, description, imageUrl, comment, likeCount } = req.body;


        const blog = new Blog({
            title,
            description,
            imageUrl,
            comment,
            likeCount,
            user: req.user._id
        })

        await blog.save()
        res.status(201).json({ "message": "blog created succesfilly" })
    } catch (error) {
        logger.error(`error in createBlog : ${JSON.stringify(error)}`)
        res.status(401).json({ "message": "something went wrong" })

    }
}