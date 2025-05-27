import { IUser } from "../interfaces/user.interface";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
