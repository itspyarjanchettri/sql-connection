import { Schema } from "mongoose";
import mongoose from "../mongodb-clients";

const sessionSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  id: { type: String, required: true },
});
const sessionModal = mongoose.model("Session", sessionSchema);

export default sessionModal;
