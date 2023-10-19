import Contact from "../../models/Contact.js";

export const add = async (req, res, next) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};