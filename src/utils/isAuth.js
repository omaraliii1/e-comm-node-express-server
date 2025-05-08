const jwt = require("jsonwebtoken");
const redisClient = require("../../redisClient");

async function isAuth(req, res, next) {
  const token = req.header("auth_token");
  if (!token) return res.status(401).json({ message: "Access denied!" });

  const isBlacklisted = await redisClient.exists(token);
  if (isBlacklisted)
    return res.status(401).send("Token is blacklisted, Please relogin!");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = {
  isAuth,
};
