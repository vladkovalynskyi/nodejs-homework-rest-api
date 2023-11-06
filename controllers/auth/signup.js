import fs from "fs/promises";
import bcrypt from "bcryptjs";
import path from "path";
import { User } from "../../models/index.js";
import {
  HttpError,
  generateAvatar,
  generateAvatarUniqueName,
  processAvatar,
  sendEmail,
} from "../../helpers/index.js";
import { nanoid } from "nanoid";

const avatarsPath = path.resolve("public", "avatars");
const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const newUserInfo = {
    ...req.body,
    password: hashPassword,
    subscription: "starter",
    avatarURL: "",
    verificationToken,
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
  console.log("signup ~ newUser:", newUser);

  const verifyEmail = {
    to: newUser.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${newUser.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default signup;