const { Level } = require("../models");

const levelController = {
  async renderLevelEditPage(req, res) {
    const levelId = parseInt(req.params.id);

    const level = await Level.findByPk(levelId);

    if (!level) {
      // Si le level demandé n'existe pas, on render la
      res.status(404).render("404"); // (alternative : on pourrait appeler next())
      return;
    }
    res.render("level", { level });
  },

  async renderLevelsPage(_req, res) {
    const levels = await Level.findAll();
    res.render("levels", { levels });
  },

  async addOneLevel(req, res) {
    const { name } = req.body;
    try {
      //check if level already exists
      const level = await Level.findOne({ where: { name } });
      if (level) {
        throw new Error("Ce niveau existe déjà !");
      } else {
        await Level.create({ name });
        const levels = await Level.findAll();
        res.render("levels", { levels, success: "Le niveau a bien été créé !"});
      }
    } catch (error) {
      console.trace(error);
      const levels = await Level.findAll();
      res.render("levels", { levels, error: error.message });
    }
  },

  async deleteOneLevel(req, res) {
    const { id } = req.params;
    try {
      //check if level is assigned to a question
      const level = await Level.findByPk(id, {
        include: ["questions"],
      });
      if (level.questions.length > 0) {
        throw new Error(
          "Ce niveau est assigné à une ou plusieurs questions, il ne peut pas être supprimé !"
        );
      }
      await Level.destroy({ where: { id } });
      const levels = await Level.findAll();
      res.render("levels", { levels, success: "Le niveau a bien été supprimé !" });
    } catch (error) {
      console.trace(error);
      const levels = await Level.findAll();
      res.render("levels", { levels, error: error.message });
    }
  },

  async updateOneLevel(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      //check if level already exists
      const level = await Level.findOne({ where: { name } });
      if (level) {
        throw new Error("Ce niveau existe déjà !");
      } else {
        await Level.update({ name }, { where: { id } });
        const levels = await Level.findAll();
        res.render("levels", { levels, success: "Le niveau a bien été modifié !"});
      }
    } catch (error) {
      console.trace(error);
      const levels = await Level.findAll();
      res.render("levels", { levels, error: error.message });
    }
  }
};

module.exports = levelController;
