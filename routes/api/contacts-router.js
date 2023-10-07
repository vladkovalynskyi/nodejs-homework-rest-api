import express from "express";
import { contactsController } from "../../controllers/index.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddSchema } from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.delete("/:id", contactsController.removeById);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.updateById
);

export default contactsRouter;