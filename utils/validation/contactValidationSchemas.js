import Joi from "joi";

const nameRegExp = /^[A-Za-zА-Яа-я]+([A-Za-zА-Яа-я]+)?$/;
const phoneRegExp = /^\(?([0-9]{3})\)? [0-9]{3}-[0-9]{4}$/;
const emailRegExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

export const contactAddSchema = Joi.object({
    name: Joi.string().required().pattern(nameRegExp).messages({
      "any.required": `missing required "name" field`,
    }),
    email: Joi.string().required().messages({
      "any.required": `missing required "email" field`,
    }),
    phone: Joi.string().required().pattern(phoneRegExp).messages({
      "any.required": `missing required "phone" field`,
    }),
    favorite: Joi.boolean(),
});
  
export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
      "any.required": `missing required "favorite" field`,
    }),
});

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

export const userVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});