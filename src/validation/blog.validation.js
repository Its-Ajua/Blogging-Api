import Joi from "joi";

export const createBlogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().default([]),
    body: Joi.string().required()
})