import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndRemove({ _id: id, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "contact deleted" });
};

export default removeById;
