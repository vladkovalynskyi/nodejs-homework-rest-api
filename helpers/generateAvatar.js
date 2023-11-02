import bcrypt from "bcryptjs";
import gravatar from "gravatar";

const generateAvatar = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();
  const hashEmail = await bcrypt.hash(normalizedEmail, 10);
  const gravatarURLOptions = { s: "250", d: "robohash" };

  return gravatar.url(hashEmail, gravatarURLOptions);
};

export default generateAvatar;
