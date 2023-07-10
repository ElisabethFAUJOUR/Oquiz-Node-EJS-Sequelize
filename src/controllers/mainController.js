const { Quiz } = require("../models/index.js");

const mainController = {
  async renderHomePage(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        include : [
          "author",
          "tags"
        ]
      });
      res.render("home", { quizzes });
    } catch(error) {
      res.render("home", { error });
    }
  }
};

module.exports = mainController;
