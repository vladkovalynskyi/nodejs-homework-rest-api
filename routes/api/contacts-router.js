import express from "express";
import { contactsController } from "../../controllers/index.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, contactsController.removeById);

export default contactsRouter;
