import { Router } from "express";

import { schemaMiddleWare } from "../middleware/schema.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createBlogSchema } from "../validation/blog.validation.js";
import * as authController from "../controllers/blog.controller.js";

const blogRoute = Router();

blogRoute.post("/", authMiddleware, schemaMiddleWare(createBlogSchema), authController.create);
blogRoute.get("/", authController.getAll);
blogRoute.get("/my-blogs", authMiddleware, authController.getMyBlogs);
blogRoute.get("/my-blogs/:id", authMiddleware, authController.getOneMyBlog);
blogRoute.get("/:id", authController.getOne);
blogRoute.put("/:id/publish", authMiddleware, authController.publish);
blogRoute.put("/:id", authMiddleware, schemaMiddleWare(createBlogSchema), authController.update);
blogRoute.delete("/:id", authMiddleware, authController.remove);

export default blogRoute;
