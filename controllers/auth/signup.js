import fs from "fs/promises";
import bcrypt from "bcryptjs";
import path from "path";
import { User } from "../../models/index.js";
import {
  HttpError,
  generateAvatar,
  generateAvatarUniqueName,
  processAvatar,
} from "../../helpers/index.js";

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUserInfo = {
    ...req.body,
    password: hashPassword,
    subscription: "starter",
    avatarURL: "",
  };

  if (!req.file) {
    const { email } = req.body;
    newUserInfo.avatarURL = await generateAvatar(email);
  }

  if (req.file) {
    const { path: oldTempPath, filename } = req.file;
    const { email } = req.body;

    const uniqueAvatarName = await generateAvatarUniqueName(email, filename);
    const newPath = path.join(avatarsPath, uniqueAvatarName);

    processAvatar(oldTempPath, newPath);

    await fs.unlink(oldTempPath);

    newUserInfo.avatarURL = path.join("avatars", uniqueAvatarName);
  }

  const newUser = await User.create(newUserInfo);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default signup;
