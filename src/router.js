const { Router } = require("express");
const mainController = require("./controllers/mainController");


const router = Router();


router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", mainController.renderQuizPage);
router.get("/themes", mainController.renderThemesPage);


module.exports = router;
