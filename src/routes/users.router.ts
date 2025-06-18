// import express, { Request, Response, NextFunction, Router } from "express";
// import {
//   createUserController,
//   deleteUserController,
//   getAllUsersController,
//   getUsersByIdController,
// } from "../controllers/users.controller";

// export const userRouter = Router();
// userRouter.get("/", getAllUsersController);
// userRouter.get("/:id", getUsersByIdController);
// userRouter.post("/", createUserController);
// userRouter.delete("/:id", deleteUserController);

import { Router } from "express";
import {
  createUserController,
  deleteUserById,
  getAllUser,
  getUsersById,
  updateUser,
} from "../controllers/users.controller";
import { UserSignIn } from "../controllers/authController/signin.controller";

export const userRouter = Router();
userRouter.get("/", getAllUser);
userRouter.get("/:id", getUsersById);
userRouter.post("/", createUserController);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", updateUser);
// userRouter.post("/login", UserSignIn);
