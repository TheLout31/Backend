const dataCheck = (req, res, next) => {
  const { name, instructor, desc, duration } = req.body;

  if (!name || !instructor || !desc || !duration) {
    return res.status(406).json({ msg: "Wrong Request" });
  }

  next();
};

module.exports = dataCheck;
