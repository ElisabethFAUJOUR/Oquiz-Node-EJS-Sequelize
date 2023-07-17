const { Router } = require("express");
const mainController = require("./controllers/mainController");
const userController = require('./controllers/userController');
const levelController = require('./controllers/levelController');
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const isAdmin = require("./middlewares/admin");
const isAuthed = require("./middlewares/auth");

const router = Router();

router.get("/", mainController.renderHomePage); // Home Page

router.get("/quiz/:id", quizController.renderQuizPage); // Quiz page
router.post("/quiz/:id/result", quizController.renderQuizResultPage); // Quiz result page

router.get("/themes", tagController.renderThemesPage); // Themes page

router.get("/signup", userController.renderSignUpPage); // Signup page
router.post("/signup", userController.signupAndRedirect);

router.get("/login", userController.renderLoginPage); // Login page
router.post('/login', userController.connectUser);

router.get("/logout", isAuthed, userController.logoutUser); // Logout

router.get("/profile", isAuthed, userController.renderProfilePage); // Profile Page

router.get("/levels", isAdmin, levelController.getAllLevels); // Levels Page
router.post("/levels", isAdmin, levelController.addOneLevel);
router.get("/levels/:id/edit", isAdmin, levelController.renderLevelEditPage); // Level Edit Page
router.post("/levels/:id/delete", isAdmin, levelController.deleteOneLevel);
router.post("/levels/:id/update", isAdmin, levelController.updateOneLevel);

module.exports = router;
