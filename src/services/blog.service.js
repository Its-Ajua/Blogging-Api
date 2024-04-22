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
        body,
    });

    await newBlog.save();

    return newBlog;
};

export const getAll = async (page = 1, limit = 20, search = {}, orderBy = {}) => {
    console.log({ page, limit, search, orderBy });
    const { author, title, tags } = search;
    const { read_count, reading_time, timestamp } = orderBy;

    // Query to filter blogs
    const query = { state: "published" };

    if (author) {
        query.author = author;
    }

    if (title) {
        query.title = { $regex: title, $options: "i" };
    }

    if (tags) {
        query.tags = { $in: tags };
    }

    // Sorting options
    const sortOptions = {};

    if (read_count) {
        sortOptions.read_count = read_count === "asc" ? 1 : -1;
    }

    if (reading_time) {
        sortOptions.reading_time = reading_time === "asc" ? 1 : -1;
    }

    if (timestamp) {
        sortOptions.timestamp = timestamp === "asc" ? 1 : -1;
    }

    const blogs = await Blog.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Blog.countDocuments(query);

    return {
        blogs,
        meta: {
            page,
            limit,
            total,
        },
    };
};

export const getOne = async (id) => {
    const blog = await Blog.findById(id);

    if (!blog) throw new CustomError("Blog not found", 404);

    if (blog.state !== "published") throw new CustomError("Blog not found", 404);

    return blog;
};

export const getAllMyBlogs = async (author, page = 1, limit = 20) => {
    console.log({ author, page, limit });
    const blogs = await Blog.find({ author })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Blog.countDocuments({ author });

    return {
        blogs,
        meta: {
            page,
            limit,
            total,
        },
    };
};

export const getOneMyBlog = async (id, author) => {
    const blog = await Blog.findOne({ _id: id, author });

    if (!blog) throw new CustomError("Blog not found", 404);

    return blog;
};

export const update = async (id, author, data) => {
    const blog = await Blog.findOne({ _id: id, author });

    if (!blog) throw new CustomError("Blog not found", 404);

    const { title, description, tags, body } = data;

    blog.title = title;
    blog.description = description;
    blog.tags = tags;
    blog.body = body;

    await blog.save();

    return blog;
};

export const remove = async (id, author) => {
    const blog = await Blog.findOne({ _id: id, author });

    if (!blog) throw new CustomError("Blog not found", 404);

    await blog.remove();

    return blog;
};

export const publish = async (id, author) => {
    const blog = await Blog.findOne({ _id: id, author });

    if (!blog) throw new CustomError("Blog not found", 404);

    blog.state = "published";
    await blog.save();

    return blog;
};
