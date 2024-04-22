import { Router } from "express";

import { schemaMiddleWare } from "../middleware/schema.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createBlogSchema } from "../validation/blog.validation.js";
import { create } from "../controllers/blog.controller.js";

const blogRoute = Router();

blogRoute.post("/", authMiddleware, schemaMiddleWare(createBlogSchema), create);

export default blogRoute