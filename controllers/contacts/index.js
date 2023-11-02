import { ctrlWrapper } from "../../decorators/index.js";

import getAll from "./getAll.js";
import getById from "./getById.js";
import add from "./add.js";
import updateById from "./updateById.js";
import updateStatusContact from "./updateStatusContact.js";
import removeById from "./removeById.js";

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeById: ctrlWrapper(removeById),
};
