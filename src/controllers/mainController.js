const { Quiz } = require("../models/index.js");

const mainController = {
  async renderHomePage(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        include : ["author", "tags"],
        order: [["title", "ASC"]]
      });
      res.render("home", { quizzes });
    } catch(error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = mainController;
