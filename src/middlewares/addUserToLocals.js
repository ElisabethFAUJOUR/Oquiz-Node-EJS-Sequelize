const addUserToLocals = (req, res, next) => {
  if(req.session.user){
    res.locals.user = req.session.user; // si utilisateur connecté dans la session => user dans locals pour les views
  }
  next();
};

module.exports = addUserToLocals;
