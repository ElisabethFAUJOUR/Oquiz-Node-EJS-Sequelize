const { Router } = require("express");
const mainController = require("./controllers/mainController");
const userController = require('./controllers/userController');
const levelController = require('./controllers/levelController');
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const sessionMw = require("./middlewares/session");
const adminMw = require("./middlewares/admin");

const router = Router();

router.get("/", mainController.renderHomePage);

router.get("/quiz/:id", quizController.renderQuizPage);

router.get("/themes", tagController.renderThemesPage);

router.get("/signup", sessionMw.checkIsConnected, userController.renderSignUpPage);
router.post("/signup", sessionMw.checkIsConnected, userController.signupAndRedirect);

router.get("/login", sessionMw.checkIsConnected, userController.renderLoginPage);
router.post('/login', sessionMw.checkIsConnected, userController.connectUser);

router.get("/logout", userController.logoutUser);

router.get("/profile", userController.renderProfilePage);

router.get("/levels", adminMw.isAdminAndIsAuthed, levelController.getAllLevels);
router.get("/levels/:id/edit", adminMw.isAdminAndIsAuthed, levelController.renderLevelEditPage);
router.post("/levels", adminMw.isAdminAndIsAuthed, levelController.addOneLevel);
router.post("/levels/:id/delete", adminMw.isAdminAndIsAuthed, levelController.deleteOneLevel);
router.post("/levels/:id/update", adminMw.isAdminAndIsAuthed, levelController.updateOneLevel);

module.exports = router;
