const { Router } = require("express");
const mainController = require("./controllers/mainController");


const router = Router();


router.get("/", mainController.renderHomePage);


module.exports = router;
