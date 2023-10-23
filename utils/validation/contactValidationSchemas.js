import Joi from "joi";
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