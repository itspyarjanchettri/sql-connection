import User from "../users/user.mangodb-model";
import SignIn from "./signin.mongodb";

 async function SaveSignInUserData(
  user_email: string,
  user_password: string
) {
  const signIn = new SignIn({
    user_email: user_email,
    user_password: user_password,
  });
  return await signIn.save();
}

async function checkUserFromLogin(email: string) {
  return await SignIn.find({ email });
}

async function checkUserData(user_email: string, user_password: string) {
  return await User.find({ user_email, user_password });
}

export {checkUserData, SaveSignInUserData, checkUserFromLogin}
