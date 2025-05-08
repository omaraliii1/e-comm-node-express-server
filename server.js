require("dotenv").config();
const PORT = process.env.PORT;
const server = require("./src/app");
const mongoose = require("mongoose");
const redis = require("./redisClient");
// const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect("mongodb://admin:adminpass@localhost:27017/auth?authSource=admin")
  .then(() => console.log("Connected to DB..!"));

(async () => {
  await redis.connect();
  server.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
  });
})();
