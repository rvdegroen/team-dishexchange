function checkAuthenticated(req, res, next) {

  try { if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
  console.log('Like error handling works');
  } catch (err) {
  console.log('Error has occured: ' + err);
  }
};

module.exports = checkAuthenticated;