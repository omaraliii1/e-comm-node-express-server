const bcrypt = require("bcrypt");

async function hashingPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}

async function compareHashed(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashingPassword,
  compareHashed,
};
