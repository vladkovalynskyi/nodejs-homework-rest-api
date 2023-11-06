import express from "express";
import { authController } from "../../controllers/index.js";
import { authenticate, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userVerifyEmailSchema,
  userSigninSchema,
  userUpdateSubscriptionSchema,
  userUpdateAvatarSchema,
} from "../../models/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(userVerifyEmailSchema),
  authController.resendVerifyEmail
);

authRouter.post(
  "/login",
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