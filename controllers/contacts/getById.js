import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const getById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOne(
    { _id: id, owner },
    "-createdAt -updatedAt"
  ).populate("owner", "email");

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default getById;
