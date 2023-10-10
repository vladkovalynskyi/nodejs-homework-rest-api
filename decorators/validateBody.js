import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
 return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return next(HttpError(400, error.message));
    }

    next();
  };
};

export default validateBody;