const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const token = req.header("auth_token");
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch {
    return res.status(401).json({ error: true, message: "Invalid token" });
  }
}

module.exports = {
  isAuth,
};
