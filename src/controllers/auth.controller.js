import { CustomError } from "../lib/custom-error.js";
import { response } from "../lib/response.js";
import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  const token = await authService.login(req.body);
  res.status(200).json(response("Login successful", {token}));
};

export const register = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(response("User created successfully", {user}))
};