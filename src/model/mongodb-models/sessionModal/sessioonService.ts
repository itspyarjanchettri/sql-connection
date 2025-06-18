import User from "../users/user.mangodb-model";
import sessionModal from "./sessionMongoDB";

async function createSession(id: string, userID: string) {
  const data = new sessionModal({
    id: id,
    userID: userID,
  });
  return await data.save();
}
// async function getusersByEmailService(email: string) {
//   const user = await userModal.findOne({ email }).select("._id").lean();
//   return user?._id;
// }
async function getusersByEmailService(user_email: string) {
  const user = await User.findOne({ user_email }).select("_id").lean();
  console.log("Found user for email:", user_email, "==>", user); // debug log
  return user?._id;
}

export { createSession, getusersByEmailService };
