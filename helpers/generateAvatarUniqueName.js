import bcrypt from "bcryptjs";

const generateAvatarUniqueName = async (email, filename) => {
  const hashEmail = await bcrypt.hash(email, 10);
  const correctedHashEmail = hashEmail.split("/").join("_");
  return `${correctedHashEmail}_${filename}`;
};

export default generateAvatarUniqueName;
