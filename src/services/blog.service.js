import Blog from "../database/schema/blog.schema.js";
import User from "../database/schema/user.schema.js";
import { CustomError } from "../lib/custom-error.js";

export const create = async (data) => {
    const { title, description, author, tags, body } = data;

    const blog = await Blog.findOne({ title });
    if (blog) throw new CustomError("Blog already exists", 400);

    const user = await User.findById(author);
    if (!user) throw new CustomError("User does not exist", 400);

    const newBlog = new Blog({
        title,
        description,
        author,
        tags,
        body
    })

    await newBlog.save();

    return newBlog;
}