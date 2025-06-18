import { Request, Response } from "express";
import {
  checkUserData,
  checkUserFromLogin,
  SaveSignInUserData,
} from "../../model/mongodb-models/authModal/signin_services";
import {
  createSession,
  getusersByEmailService,
} from "../../model/mongodb-models/sessionModal/sessioonService";

export const UserSignIn = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password } = req.body;

    const getsignindetails = await checkUserData(user_email, user_password);
    console.log("get signin result", getsignindetails);
    if (getsignindetails && getsignindetails.length > 0) {
      const checkExistingMail = await checkUserFromLogin(user_email);

      const userID = await getusersByEmailService(user_email);

      console.log("user id:", userID);

      if (!userID) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const sessionID = crypto.randomUUID();

      const session = await createSession(sessionID, userID.toString());
      const EXPIRY_TIME_IN_SECONDS = 500;
      res.cookie("authorization", {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS * 1000),
        sameSite: "lax",
        secure: process.env["ENVIRONMENT"] === "prod",
      });
      res.json("Cookies");

      console.log("check existing ", checkExistingMail);

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
