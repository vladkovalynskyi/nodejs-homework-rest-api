import mongoose from "mongoose";
import app from "./app.js";

const { DB_HOST, PORT = 3000 } = process.env;

if (!DB_HOST) {
  console.error("DB_HOST is not defined. Please set the environment variable.");
  process.exit(1);
}

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT)
    .on('listening', () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
    })
    .on('error', (error) => {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
