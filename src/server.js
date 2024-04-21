import app from "./index.js";
import { PORT, MONGO_URI } from "./config/index.js";
import { connect } from "./database/connection.js";

connect(MONGO_URI).then(() => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, visit http://localhost:5000`);
  });
}).catch((err)=> console.log(err));