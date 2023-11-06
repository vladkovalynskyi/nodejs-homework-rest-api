import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200);
  res.json({ message: "Verification successful" });
};

export default verifyEmail;