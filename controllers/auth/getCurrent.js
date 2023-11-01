const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

export default getCurrent;
