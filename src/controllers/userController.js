const {User} = require('../models/index.js');
const hashPassword = require("../lib/password.js");

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
      console.log(user);
      return user;
    }
    catch (error) {
      console.log(error);
    }
  }
};

module.exports = userController;
