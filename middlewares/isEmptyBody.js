import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  if (!req.body.favorite && !Object.keys(req.body).length) {
    return next(HttpError(400, "Missing field favorite"));
  }
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "All fields empty"));
  }
  next();
};

export default isEmptyBody;
