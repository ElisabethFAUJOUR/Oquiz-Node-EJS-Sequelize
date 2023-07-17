// Charger les variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Importer les dependances
const express = require("express");
const session = require('express-session');

// Import local
const router = require("./src/router");
const middleware404 = require("./src/middlewares/middleware404");
const addUserToLocals = require("./src/middlewares/addUserToLocals");

// Création de l'application express
const app = express();

// Setup session & Ajout de User dans les locals
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true
  })
);
app.use(addUserToLocals);

// Config view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Setup dossier public
app.use(express.static("public")); // Ca revient à déclarer une route par fichier en quelque sorte

// Body parser
app.use(express.urlencoded({ extended: true }));

// Config le router
app.use(router);

// Middleware error 404
app.use(middleware404);

// Lancer l'application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
