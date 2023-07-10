// Charger les variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Importer les dependances
const express = require("express");
const session = require('express-session');
const router = require("./src/router");

// Création de l'application express
const app = express();

// Setup session
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

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
app.use((req,res) => {
  res.status(404).render('404');
});

// Lancer l'application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
