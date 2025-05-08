const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
  console.log("Redis server is connected...");
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = client;
