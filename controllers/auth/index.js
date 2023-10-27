import { ctrlWrapper } from "../../decorators/index.js";

import signup from "./signup.js";
import signin from "./signin.js";
import signout from "./signout.js";
import getCurrent from "./getCurrent.js";
import updateSubscription from "./updateSubscription.js";

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
};