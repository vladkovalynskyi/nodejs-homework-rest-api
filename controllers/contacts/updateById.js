import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner },
    req.body
  ).populate("owner", "email");

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};

export default updateById;
