// Charger les variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Importer les dependances
const express = require("express");
const router = require("./src/router");
const middleware404 = require("./src/middlewares/middleware404");
const sessionMw = require("./src/middlewares/session");

// Création de l'application express
const app = express();

// Setup session & set locals user
app.use(sessionMw.setupSession);
app.use(sessionMw.addUserToLocals);

// Configurer le view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// On expose le contenu du dossier public au reste du monde
app.use(express.static("public")); // Ca revient à déclarer une route par fichier en quelque sorte

// Notre body parser pour les requêtes POST
app.use(express.urlencoded({ extended: true }));

// On plug le router
app.use(router);

// Error 404
app.use(middleware404.render404page);

// Lancer l'application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
