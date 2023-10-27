import mongoose from "mongoose";
import { app } from "./app.js";

const { DB_HOST, PORT = 3000 } = process.env;

async function startServer() {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
}

startServer();