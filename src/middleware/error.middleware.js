import { response } from "../lib/response.js";
 
export function configureErrorMiddleware(app) {
    // Handle 404 requests
    app.use("*", (_req, res) => {
        res.status(404).send(response("Not found", null, false));
    });
 
    // Handle errors middleware
    app.use((error, _req, res, next) => {
        // Handle custom errors
        if (error.name == "CustomError" && (error).status) {
            res.status((error).status).send(response(error.message, null, false));
        } else if (error.name == "MongoError" && (error).code == 11000) {
            // Catch duplicate key field error
            const field = Object.entries((error).keyValue)[0]?.[0];
            res.status(400).send(response(`${field} already exists`, null, false));
        } else if (error.name == "CastError") {
            res.status(400).send(response("resource does not exist", null, false));
        } else if (["JsonWebTokenError", "ValidationError", "SyntaxError", "MongooseError", "MongoError"].includes(error.name)) {
            res.status(400).send(response(error.message, null, false));
        } else {
            res.status(500).send(response(error.message, null, false));
        }
 
        next();
    });
 
    return app;
};