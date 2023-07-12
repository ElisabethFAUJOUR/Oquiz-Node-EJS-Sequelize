
const session = require('express-session');

const sessionMw = {
  setupSession : session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true
  }),

  addUserToLocals(req, res, next) {
    if(req.session.user){
      res.locals.user = req.session.user; // si utilisateur connecté dans la session => user dans locals pour les views
    }
    next();
  },

  isAuthed(req, res, next){
    if(req.session.user){ // si utilisation connecté dans la session, redirect vers la page home
      res.redirect('/');
    }
    else {
      next();
    }
  }

};

module.exports = sessionMw;
