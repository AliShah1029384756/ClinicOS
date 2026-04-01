const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/clinicos";

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("ClinicOS DB connected");
    app.listen(PORT, () => {
      console.log(`ClinicOS API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

start();
