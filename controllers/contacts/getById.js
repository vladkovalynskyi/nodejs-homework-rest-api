import Contact from "../../models/Contact.js";
import { HttpError } from "../../helpers/index.js";

export const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};