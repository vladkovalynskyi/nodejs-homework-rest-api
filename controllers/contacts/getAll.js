import Contact from "../../models/Contact.js";

export const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};