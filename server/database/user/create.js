import { UserModel } from "../schema";

async function createUser({
  firstName,
  lastName,
  email,
  password,
  providerId,
  provider,
  role,
}) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOne({ email });

    if (user) {
      return reject("Email is already in use");
    }

    return resolve(
      await UserModel.create({
        providerId,
        provider,
        firstName,
        lastName,
        email,
        password,
        role,
      })
    );
  });
}

export { createUser };
