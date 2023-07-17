const {User} = require('../models/index.js');
const {hashPassword, comparePassword} = require("../lib/password.js");
const validator = require("email-validator");

const userController = {
  async renderSignUpPage (req, res) {
    try {
      res.render("signup");
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async renderLoginPage (req, res) {
    try {
      res.render("login");
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
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
  },

  async signupAndRedirect(req, res, next) {
    const { firstname, lastname, email, password, confirmation } = req.body;
    try {
      // - ✅ Vérifier que tous les champs sont présents
      if (!firstname || !lastname || !email || !password || !confirmation) {
        throw new Error("Merci de renseigner tous les champs");
      }
      // - ✅ Vérifier que l'adresse email a un format valide
      if (!validator.validate(email)) {
        throw new Error("Email invalide");
      }
      // - ✅ Vérifier que la confirmation est identique au password
      if (password !== confirmation) {
        throw new Error("Confirmation de mot de passe invalide");
      }
      // - ✅ Vérifier la force du mdp (dans notre cas, on verifiera juste qu'il y a plus que 8 caractères)
      if (password.length < 8) {
        throw new Error("Veuillez choisir un mot de passe de plus de 8 caractères.");
      }

      const hashedPassword = await hashPassword(password);

      try {
        const [user, created] = await User.findOrCreate({
          where : { email : email }, // trouve si il existe déjà un utilisateur avec cet email
          defaults : { // sinon, créé l'utilisateur avec le nouvel email et les données ci-dessous
            firstname : firstname,
            lastname : lastname,
            password : hashedPassword,
            role : "member"
          }
        });
        // - ✅ Vérifier si l'email n'est pas déjà présent dans la BDD
        if (!created) {
          throw new Error("Un comtpe existe déjà avec cet email");
        }

        // stocker les informations de l'utilisateur SANS le mdp
        req.session.user = {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role : user.role,
        };

        req.session.save(function (err) {
          if (err) return next(err);
          res.redirect("/");
        });
      } catch (error) {
        res.render("signup", {error: error.message});
      }
    }
    catch (error) {
      res.render("signup", {error: error.message});
    }
  },

  async connectUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where : { email : email },
      });
      // - ✅ Vérifier si l'email de l'utilisateur est bien dans la BDD
      if (!user) {
        throw new Error("Aucun compte enregistré avec cet e-mail.");
      }
      // - ✅ Vérifier si le mot de passe est bon
      const checkedPassword = await comparePassword(password, user.password);
      if (checkedPassword) {
        req.session.regenerate(function (error) {
          console.log(error);
          if (error) next(error);

          // stocker les informations de l'utilisateur SANS le mdp => que l'id
          req.session.user = user;

          // enregistrer la session avant la redirection
          // le chargement ne se produit pas avant la sauvegarde de la session
          req.session.save(function (err) {
            if (err) return next(err);
            res.redirect("/");
          });
        });
      } else {
        throw new Error("Mot de passe incorrect.");
      }
    } catch(error) {
      res.render("login", {error: error.message});
    }
  },

  logoutUser(req, res) {
    try {
      req.session.user = null;
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = userController;
