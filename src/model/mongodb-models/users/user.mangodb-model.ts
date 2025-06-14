import mongoose from "../mongodb-clients";
import { Schema } from "mongoose";

const userSchema = new Schema({
  user_name: {
    type: String,
    require: true,
  },
  user_email: {
    type: String,
    require: true,
  },
  user_password: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    require: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
