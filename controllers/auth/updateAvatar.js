import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { User } from "../../models/index.js";
import {
  HttpError,
  generateAvatarUniqueName,
  processAvatar,
} from "../../helpers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsPath = path.resolve(__dirname, "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: oldTempPath, filename } = req.file;
  const { _id, email, avatarURL: oldAvatar } = req.user;

  const uniqueAvatarName = await generateAvatarUniqueName(email, filename);
  const newPath = path.join(avatarsPath, uniqueAvatarName);

  processAvatar(oldTempPath, newPath);

  fs.unlink(oldTempPath).catch((error) => console.error(error));

  const avatarURL = path.join("avatars", uniqueAvatarName);

  const user = await User.findByIdAndUpdate(_id, { avatarURL });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (!oldAvatar.includes("gravatar")) {
    const avatarToDelete = path.join("public", oldAvatar);
    await fs.unlink(avatarToDelete);
  }

  res.status(200).json({
    avatarURL: user.avatarURL,
  });
};

export default updateAvatar;
