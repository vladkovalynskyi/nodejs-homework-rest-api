import Contact from "../../models/Contact.js";
import { HttpError } from "../../helpers/index.js";

export const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "contact deleted" });
};