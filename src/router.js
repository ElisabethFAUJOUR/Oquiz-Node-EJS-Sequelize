const { Router } = require("express");
const mainController = require("./controllers/mainController");
const userController = require('./controllers/userController');

const router = Router();

router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", mainController.renderQuizPage);
router.get("/themes", mainController.renderThemesPage);
router.get("/login", mainController.renderLoginPage);
router.get("/signup", mainController.renderSignUpPage);
router.post("/addUser", userController.addUser);

module.exports = router;
