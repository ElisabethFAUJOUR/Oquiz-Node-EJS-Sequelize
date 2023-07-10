const {User} = require('../models/index.js');
const {hashPassword, comparePassword} = require("../lib/password.js");

const userController = {
  async addUser(req, res) {
    const { firstname, lastname, email, password, confirmation } = req.body;
    try {
      if (password !== confirmation) {
        throw new Error("Confirmation de mot de passe invalide");
      }
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
      });
      return user;
    }
    catch (error) {
      return console.log(error);
    }
  },

  async connectUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const userFromDb = await User.findOne({
        where : { email : email }
      });
      const checkedPassword = await comparePassword(password, userFromDb.password);
      if (checkedPassword) {
        req.session.regenerate(function (err) {
          console.log(err);
          if (err) next(err);

          // store user information in session, typically a user id
          req.session.user = {
            email: userFromDb.email,
            firstname: userFromDb.firstname,
            lastname: userFromDb.lastname
          };
          // save the session before redirection to ensure page
          // load does not happen before session is saved
          req.session.save(function (err) {
            if (err) return next(err);
            console.log(req.session);
            res.redirect("/");
          });
        });
      }
    } catch(error) {
      console.log(error);
    }

  }
};

module.exports = userController;
