const adminMw = {
  isAdmin (req, res, next) {
    if(req.session.user && req.session.user.role === 'admin'){ // si l'utilisateur est connecté et role=admin => next dans la route
      next();
    }
    else {
      res.redirect('/'); // sinon on redirige vers la home page
    }
  },
};

module.exports = adminMw;
