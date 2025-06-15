import { Request, Response } from "express";
import {
  createUser,
  deleteUserService,
  getAllByIdUserService,
  getAllbyUserServices,
  updateUserService,
} from "../model/mongodb-models/users/user_services";

// export const getAllUsersController = async (req: Request, res: Response) => {
//   const users = await SqlUsersModel.getAll();
//   res.json(users);
// };

// export const getUsersByIdController = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const user = await SqlUsersModel.getUsersById(id);
//   console.log("user cont", user);
//   if (!user) res.status(404).json({ error: "User not found" });
//   res.status(200).json(user);
// };

// export const createUserController = async (req: Request, res: Response) => {
//   const { username, name, email, created_at, update_at } = req.body;
//   const newUser = await SqlUsersModel.create({
//     username,
//     name,
//     email,
//     created_at,
//     update_at,
//   });
//   console.log("result",newUser)
//   res.status(201).json(newUser);
// };

// export const updateUsersController = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const { username, name, email, created_at,update_at} = req.body;

//   const updated = await SqlUsersModel.update(id, {
//     username,
//     name,
//     email,
//     created_at,
//     update_at,
//   });
//   if (!updated) res.status(404).json({ error: "User not found" });

//   res.status(200).json(updated);
// };

// export const deleteUserController = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const deleted = await SqlUsersModel.deleteUsersById(id);
//   if (!deleted) res.status(404).json({ error: "User not found" });

//   res.status(200).json(deleted);
// };

function validationUser(body: any) {
  if (typeof body.user_name !== "string" || body.user_name.trim()) {
    return "name is required!";
  }

  if (typeof body.user_email !== "string" || body.user_email.trim()) {
    return "email is required!";
  }

  if (typeof body.user_password.trim()) {
    return "password is required!";
  }
}

export const getAllUser = async (req: Request, res: Response) => {
  const getallUsers = await getAllbyUserServices();
  console.log(getallUsers);
  if (!getallUsers) {
    res.status(404).json({ message: "No users found" });
  }

  res.status(200).send(getallUsers);
};

export const getUsersById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const getallbyid = await getAllByIdUserService(id);
  if (!getallbyid) {
    res.status(404).json({ message: "users not found" });
  }
  res.json(getallbyid);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { user_name, user_email, user_password } = req.body;
  console.log(req.body);
  const updatedUser = await updateUserService(id, {
    user_name,
    user_email,
    user_password,
  });
  console.log("result", updatedUser);

  if (!updatedUser) {
    res.status(404).json({ message: "user not found" });
  }
  const error = { ...updatedUser, ...req.body };
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const getUserById = await getAllByIdUserService(id);
    res.json(getUserById);
  } catch (error) {
    res.send(error);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const deletedUser = deleteUserService(id);
  console.log(deletedUser);
  if (!deletedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).send({ message: "User deleted successfully" });
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const createdUser = await createUser(req.body);
    console.log(createdUser);
    res.status(201).json(createdUser);
  } catch (err) {
    res.send(err);
  }
};
