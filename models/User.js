import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const emailRegExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

export const userUpdateAvatarSchema = Joi.object({
  avatarURL: Joi.string(),
});

const User = model("user", userSchema);

export default User;
