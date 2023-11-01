import express from "express";
import { authController } from "../../controllers/index.js";
import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  userUpdateSubscriptionSchema,
  userUpdateAvatarSchema,
} from "../../models/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userUpdateSubscriptionSchema),
  authController.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  validateBody(userUpdateAvatarSchema),
  authController.updateAvatar
);

export default authRouter;
