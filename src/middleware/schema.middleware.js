import { response } from "../lib/response.js";

export const schemaMiddleWare = (schema) => {
    return (req, res, next) => {
      if (schema) {
        const result = schema.validate(req.body);
        if (result.error) {
          return res
            .status(400)
            .json(response("Validation error", {...result.error}))
        }
      }
      next();
    };
  };