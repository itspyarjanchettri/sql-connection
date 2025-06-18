import { SignupUserService } from "../../model/mongodb-models/authModal/signUp";
import { Request, Response } from "express";

export async function SignUp(req: Request, res: Response) {
  try {
    const SignUpUser = await SignupUserService(req.body);
    res.status(200).json({ message: "User SignUp succesfully!" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
