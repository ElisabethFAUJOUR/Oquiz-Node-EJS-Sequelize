const { Quiz } = require("../models/index.js");

const quizController = {
  async renderQuizPage(req, res) {
    const {id} = req.params;
    try {
      const quiz = await Quiz.findByPk(id, {
        include : [
          { association : "author"},
          { association: "tags"},
          { association : "questions", include : ["propositions", "level", "good_answer"]}
        ]
      });
      res.render("quiz", { quiz });
    } catch(error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async renderQuizResultPage(req, res) {
    const {id} = req.params;
    try {
      const quiz = await Quiz.findByPk(id, {
        include : [
          { association : "author"},
          { association: "tags"},
          { association : "questions", include : ["propositions", "level", "good_answer"]}
        ]
      });
      let userScore = 0;
      for (const question of quiz.questions) {
        const questionId = question.id;
        const goodAnswerId = question.good_answer.id;
        const userSubmitAnswerId = parseInt(req.body[questionId]);
        // req.body { '1': '4', '2': '2', '3': '1', ...}
        // req.body { 'question.id' : 'proposition.id' , ...}

        if (goodAnswerId === userSubmitAnswerId) {
          userScore++;
        }
      }
      const nbOfQuestions = quiz.questions.length;
      const userAnswers = req.body;
      res.render("quiz-result", { quiz, userScore, nbOfQuestions, userAnswers });
    } catch(error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = quizController;
