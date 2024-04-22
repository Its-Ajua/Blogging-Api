import { Router } from "express";

import {login, register} from "../controllers/auth.controller.js";
import { schemaMiddleWare } from "../middleware/schema.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const authRoute = Router();

authRoute.post("/login", schemaMiddleWare(loginSchema), login);
authRoute.post("/register", schemaMiddleWare(registerSchema), register);

export default authRoute;