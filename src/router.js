const { Router } = require("express");
const mainController = require("./controllers/mainController");
const userController = require('./controllers/userController');
const levelController = require('./controllers/levelController');

const router = Router();

router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", mainController.renderQuizPage);
router.get("/themes", mainController.renderThemesPage);
router.get("/login", mainController.renderLoginPage);
router.get("/signup", mainController.renderSignUpPage);
router.post("/addUser", userController.addUser);
router.post('/connectUser', userController.connectUser);
router.get("/profile", userController.renderProfilePage);
router.get("/levels", levelController.getAllLevels);


// Level Post
router.post("/levels", levelController.addOneLevel);
router.post("/levels/:id/delete", levelController.deleteOneLevel);
router.get("/levels/:id/edit", levelController.renderLevelEditPage);
router.post("/levels/:id/update", levelController.updateOneLevel);

module.exports = router;
