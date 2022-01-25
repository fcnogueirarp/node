module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.UserId;

  if (!userId) {
    res.redirect('/login');
  }
  next();
};
