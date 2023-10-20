const isAuthed = (req, res, next) => {
  if(req.session.user){ // si utilisation connecté dans la session, redirect vers la page home
    next();
  }
  else {
    res.redirect('/');
  }
};

module.exports = isAuthed;
