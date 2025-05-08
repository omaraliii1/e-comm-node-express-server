require("dotenv").config();
const jwt = require("jsonwebtoken");

function genToken(userID) {
  const token = jwt.sign({ id: userID }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
}

module.exports = {
  genToken,
};
