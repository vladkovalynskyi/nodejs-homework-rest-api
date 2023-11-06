import { ctrlWrapper } from "../../decorators/index.js";

import signup from "./signup.js";
import verifyEmail from "./verifyEmail.js";
import resendVerifyEmail from "./resendVerifyEmail.js";
import signin from "./signin.js";
import signout from "./signout.js";
import getCurrent from "./getCurrent.js";
import updateSubscription from "./updateSubscription.js";
import updateAvatar from "./updateAvatar.js";

export default {
  signup: ctrlWrapper(signup),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};