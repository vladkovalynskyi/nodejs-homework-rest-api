import express from "express";
import { authController } from "../../controllers/index.js";
import authenticate from "../../middlewares/authenticate.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  userUpdateSubscriptionSchema,
} from "../../models/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authController.signup
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

export default authRouter;