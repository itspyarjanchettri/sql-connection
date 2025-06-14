import { Request, Response } from "express";
import {
  checkUserData,
  checkUserFromLogin,
  SaveSignInUserData,
} from "../model/mongodb-models/signin/signin_services";
export const UserSignIn = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password } = req.body;
    const getsignindetails = await checkUserData(user_email, user_password);

    if (getsignindetails && getsignindetails.length > 0) {
      const checkExistingMail = await checkUserFromLogin(user_email);
      if (checkExistingMail.length === 0) {
        const savesignindata = await SaveSignInUserData(
          user_email,
          user_password
        );
        res.status(200).json(savesignindata);
      } else {
        res.status(200).json("You are old user Welcome Back");
        console.log("old user logged in");
      }
      res.status(200).json("Logged in");
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch {
    res.json("Unable to login");
  }
};
