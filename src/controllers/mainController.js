const { Quiz, Tag, Question, Level, Answer, User } = require("../models/index.js");

const mainController = {
  async renderHomePage(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        include : [
          "author",
          "tags"
        ],
        order: [["title", "ASC"]]
      });
      res.render("home", { quizzes });
    } catch(error) {
      res.render("home", { error });
    }
  },

  async renderQuizPage(req, res) {
    const {id} = req.params;
    try {
      const quiz = await Quiz.findByPk(id, {
        include : [{
          model: User,
          as: "author",
        },{
          model: Tag,
          as: "tags",
        }, {
          model: Question,
          as: "questions",
          include : [
            {
              model: Level,
              as: "level",
            },
            {
              model: Answer,
              as: "propositions",
            },
          ]
        }]
      });
      // console.log(quiz);
      res.render("quiz", { quiz });
    } catch(error) {
      res.render("quiz", { error });
    }
  },
  async renderThemesPage(req, res) {
    try {
      const themes = await Tag.findAll({
        include: "quizzes"
      });
      res.render("themes", {
        themes
      });
    } catch (error) {
      console.log(error);
    }
  },

  async renderSignUpPage (req, res) {
    try {
      res.render("signup");
    } catch (error) {
      console.log(error);
    }
  },

  async renderLoginPage (req, res) {
    try {
      res.render('login');
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = mainController;
