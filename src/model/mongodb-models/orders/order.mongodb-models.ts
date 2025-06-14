import { Schema } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, require: true, ref: "user" },
  createdAt: { type: Schema.Types.ObjectId, require: true },
});

const order = mongoose.model("User", orderSchema);

export default order;
