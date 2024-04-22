import { response } from "../lib/response.js";
import * as blogService from "../services/blog.service.js";

export const create = async (req, res) => {
    const blog = await blogService.create({ ...req.body, author: req.user._id });
    res.status(201).json(response("Blog created successfully", { blog }));
};

export const getAll = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const search = req.query.search || {};
    const orderBy = req.query.orderBy || {};

    const blogs = await blogService.getAll(page, limit, search, orderBy);
    res.status(200).json(response("Blogs fetched successfully", { blogs }));
};

export const getOne = async (req, res) => {
    const blog = await blogService.getOne(req.params.id);
    res.status(200).json(response("Blog fetched successfully", { blog }));
};

export const publish = async (req, res) => {
    const blog = await blogService.publish(req.params.id, req.user._id);
    res.status(200).json(response("Blog published successfully", { blog }));
};

export const getMyBlogs = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const search = req.query.search || {};
    const orderBy = req.query.orderBy || {};

    console.log({ author: req.user._id, page, limit, search, orderBy });

    const blogs = await blogService.getAllMyBlogs(req.user._id, page, limit, search, orderBy);
    res.status(200).json(response("Blogs fetched successfully", { blogs }));
};

export const getOneMyBlog = async (req, res) => {
    const blog = await blogService.getOneMyBlog(req.params.id, req.user._id);
    res.status(200).json(response("Blog fetched successfully", { blog }));
};

export const update = async (req, res) => {
    const blog = await blogService.update(req.params.id, req.user._id, req.body);
    res.status(200).json(response("Blog updated successfully", { blog }));
};

export const remove = async (req, res) => {
    await blogService.remove(req.params.id, req.user._id);
    res.status(204).json();
};
