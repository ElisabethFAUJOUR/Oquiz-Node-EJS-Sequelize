const { Tag } = require("../models/index.js");

const tagController = {
  async renderThemesPage(req, res) {
    try {
      const themes = await Tag.findAll({
        include: "quizzes"
      });
      res.render("themes", { themes });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = tagController;
