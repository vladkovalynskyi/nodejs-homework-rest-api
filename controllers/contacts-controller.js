import contactsServices from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res, next) => {
  const result = await contactsServices.getAllContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsServices.getContactById(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const result = await contactsServices.addContact(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsServices.removeContact(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;

  const result = await contactsServices.updateContact(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};