import Jwt from "jsonwebtoken";
import { CustomError } from "../lib/custom-error";

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) throw new CustomError("Unauthorized", 401);

  const bearerToken = authorization.split(" ");

  if (bearerToken.length !== 2) throw new CustomError("Unauthorized", 401);

  Jwt.verify(bearerToken[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new CustomError("Unauthorized");
    }
    req.user = decoded;
    next();
  });
};