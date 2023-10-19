import Contact from "../../models/Contact.js";
import { HttpError } from "../../helpers/index.js";

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};