import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";

const updateSubscription = async (req, res) => {
  const subscriptionsOptions = ["starter", "pro", "business"];
  const { subscription } = req.body;

  if (!subscriptionsOptions.includes(subscription)) {
    throw HttpError(404, "Invalid subscription type");
  }

  const user = await User.findByIdAndUpdate(req.user._id, req.body);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

export default updateSubscription;
