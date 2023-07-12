const middleware = {
  render404page(req, res) {
    res.status(404).render("404");
  },

  addUserToLocals(req, res, next) {
    if(req.session.user){
      res.locals.user = req.session.user; // si utilisateur connecté dans la session => user dans locals pour les views
    }
    next();
  },

  checkIsConnected(req, res, next){
    if(req.session.user){
      res.redirect('/');
    }
    else {
      next();
    }
  }

};

module.exports = middleware;
