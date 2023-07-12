const { Router } = require("express");
const mainController = require("./controllers/mainController");
const userController = require('./controllers/userController');
const levelController = require('./controllers/levelController');
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const sessionMw = require("./middlewares/session");
const adminMw = require("./middlewares/admin");

const router = Router();

router.get("/", mainController.renderHomePage); // Home Page

router.get("/quiz/:id", quizController.renderQuizPage); // Quiz page

router.get("/themes", tagController.renderThemesPage); // Themes page

router.get("/signup", sessionMw.isAuthed, userController.renderSignUpPage); // Signup page
router.post("/signup", sessionMw.isAuthed, userController.signupAndRedirect);

router.get("/login", sessionMw.isAuthed, userController.renderLoginPage); // Login page
router.post('/login', sessionMw.isAuthed, userController.connectUser);

router.get("/logout", sessionMw.isAuthed, userController.logoutUser); // Logout

router.get("/profile", userController.renderProfilePage); // Profile Page

router.get("/levels", adminMw.isAdmin, levelController.getAllLevels); // Levels Page
router.post("/levels", adminMw.isAdmin, levelController.addOneLevel);
router.get("/levels/:id/edit", adminMw.isAdmin, levelController.renderLevelEditPage); // Level Edit Page
router.post("/levels/:id/delete", adminMw.isAdmin, levelController.deleteOneLevel);
router.post("/levels/:id/update", adminMw.isAdmin, levelController.updateOneLevel);

module.exports = router;
