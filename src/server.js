import app from "./index.js";
import { logger } from "./lib/logger.js";
import { PORT, MONGO_URL } from "./config/index.js";
import { connect } from "./database/connection.js";

connect(MONGO_URL).then(() => {
  logger.info("Database connected")
  app.listen(PORT, () => {
    logger.log("info",`Server is running on port ${PORT}, visit http://localhost:5000`);
  });

  app.on("error", (error)=> logger.error(`An error occurred on the server: \n ${error}`))
}).catch((err)=> logger.error("Database connection failed",err));