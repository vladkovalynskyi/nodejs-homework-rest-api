import express from "express";
import { contactsController } from "../../controllers/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddSchema } from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.delete("/:id", contactsController.removeById);

contactsRouter.put(
  "/:id",
  validateBody(contactAddSchema),
  contactsController.updateById
);

export default contactsRouter;