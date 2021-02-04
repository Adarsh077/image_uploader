process.stdout.write("\x1Bc"); /* Clears console */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});

dotenv.config();
const app = require("./app");

const DB =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URL_DEV
    : process.env.MONGODB_URL_PROD;

mongoose
  .connect(DB, {
    dbName: "image_upload",
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`🗄  DB connect - ${DB}`));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`🔥 App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
