import Jimp from "jimp";
import HttpError from "./HttpError.js";

const processAvatar = async (oldPath, newPath) => {
  await Jimp.read(oldPath)
    .then((image) => image.resize(250, 250).write(newPath))
    .catch((error) => {
      throw HttpError(400, error.message);
    });
};

export default processAvatar;
