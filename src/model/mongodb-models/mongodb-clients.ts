import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://pyarjanskillprompt:pyarjan@cluster0.xqj5ayy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("connection error:", err);
});

db.once("open", function () {
  console.log("connected to MongoDB!");
});

export default mongoose;
