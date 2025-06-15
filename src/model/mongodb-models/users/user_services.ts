import User from "./user.mangodb-model";

export async function getAllbyUserServices() {
  const allUsers = await User.find();
  return allUsers;
}

export async function getAllByIdUserService(id: string) {
  const user = await User.findById(id);
  return user;
}

export async function createUser(data: {
  user_name: string;
  user_email: string;
  user_password: string;
}) {
  const createUser = new User(data);
  return await createUser.save();
}

export async function updateUserService(
  id: string,
  data: {
    user_name: string;
    user_email: string;
    user_password: string;
  }
) {
  if (
    data.user_name !== undefined &&
    data.user_email !== undefined &&
    data.user_password !== undefined
  ) {
    const updatedUser = await User.updateOne(
      { _id: id },
      {
        $set: {
          user_name: data.user_name,
          user_email: data.user_email,
          user_password: data.user_password,
        },
      }
    );
    return updatedUser;
  }
  return null;
}

export async function deleteUserService(id: string) {
  const deletedUser = await User.deleteOne({ _id: id });

  return deletedUser;
}
