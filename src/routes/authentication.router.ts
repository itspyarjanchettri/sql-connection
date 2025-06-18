import express, { Router } from "express";
import { SignUp } from "../controllers/authController/signUp.controller";
import { UserSignIn } from "../controllers/authController/signin.controller";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", UserSignIn);

export default router;