const { Quiz } = require("../models/index.js");

const quizController = {
  async renderQuizPage(req, res) {
    const {id} = req.params;
    try {
      const quiz = await Quiz.findByPk(id, {
        include : [
          { association : "author"},
          { association: "tags"},
          { association : "questions", include : ["propositions", "level"]}
        ]
      });
      res.render("quiz", { quiz });
    } catch(error) {
      console.error(error);
      res.status(500).render("500");
    }
  },
};

module.exports = quizController;
