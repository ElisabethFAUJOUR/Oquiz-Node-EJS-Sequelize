const { Router } = require("express");
const mainController = require("./controllers/mainController");


const router = Router();


router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", mainController.renderQuizPage);


module.exports = router;
