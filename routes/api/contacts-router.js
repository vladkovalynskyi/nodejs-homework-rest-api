import express from "express";
import { contactsController } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  validateBody(contactAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete("/:id", contactsController.removeById);

export default contactsRouter;
