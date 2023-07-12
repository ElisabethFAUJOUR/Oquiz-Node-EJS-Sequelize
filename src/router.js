const { Router } = require("express");
const mainController = require("./controllers/mainController");
const userController = require('./controllers/userController');
const levelController = require('./controllers/levelController');
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const middleware = require("./middlewares/middleware");

const router = Router();

router.get("/", mainController.renderHomePage);

router.get("/quiz/:id", quizController.renderQuizPage);

router.get("/themes", tagController.renderThemesPage);

router.get("/signup", middleware.checkIsConnected, userController.renderSignUpPage);
router.post("/signup", middleware.checkIsConnected, userController.signupAndRedirect);

router.get("/login", middleware.checkIsConnected, userController.renderLoginPage);
router.post('/login', middleware.checkIsConnected, userController.connectUser);

router.get("/logout", userController.logoutUser);

router.get("/profile", userController.renderProfilePage);

router.get("/levels/:id/edit", levelController.renderLevelEditPage);
router.get("/levels", levelController.getAllLevels);
router.post("/levels", levelController.addOneLevel);
router.post("/levels/:id/delete", levelController.deleteOneLevel);
router.post("/levels/:id/update", levelController.updateOneLevel);

module.exports = router;
