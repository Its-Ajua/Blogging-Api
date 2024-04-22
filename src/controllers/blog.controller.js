import { response } from "../lib/response.js";
import * as blogService from "../services/blog.service.js";

export const create = async (req, res) => {
    const blog = await blogService.create({...req.body, author: req.user._id});
    res.status(201).json(response("Blog created successfully", {blog}))
}