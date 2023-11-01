import { Contact } from "../../models/index.js";

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { favorite = false, page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { favorite, owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");

  res.json(result);
};

export default getAll;
