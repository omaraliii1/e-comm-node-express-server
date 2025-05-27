require("dotenv").config();
import jwt from "jsonwebtoken";

export const genToken = (userID: string) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined");
  }
  const token = jwt.sign({ id: userID }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
