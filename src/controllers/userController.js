const {User} = require('../models/index.js');
const {hashPassword, comparePassword} = require("../lib/password.js");
const validator = require("email-validator");

const userController = {
  async addUser(req, res, next) {
    const { firstname, lastname, email, password, confirmation } = req.body;
    try {
      if (password !== confirmation) {
        throw new Error("Confirmation de mot de passe invalide");
      }
      /*if (!validator.validate(email)) {
        throw new Error("Email invalide");
      }*/
      const hashedPassword = await hashPassword(password);
      try {
        await User.create({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          admin: false
        });
        req.session.user = {
          email,
          firstname,
          lastname,
          admin: false
        };
        req.session.save(function (err) {
          if (err) return next(err);
          console.log(req.session);
          res.redirect("/profile");
        });
      } catch (error) {
        return error;
      }
    }
    catch (error) {
      res.render('signup', {error: error.message});
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
            lastname: userFromDb.lastname,
            admin: userFromDb.admin
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
  },

  async renderProfilePage(req, res) {
    try {
      if (!req.session.user) {
        res.redirect("/login");
      } else {
        res.render("profile");
      }
    } catch(error) {
      return error;
    }
  }
};

module.exports = userController;
