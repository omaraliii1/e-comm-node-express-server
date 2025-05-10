const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: true, message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch {
    return res.status(401).json({ error: true, message: "Invalid token" });
  }
}

module.exports = { isAuth };
