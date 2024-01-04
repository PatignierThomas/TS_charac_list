// import ES6
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import session from 'express-session';

import router from "./router/index.route.js";

// Création de l'application express
const app  = express();
const PORT = 9000;


// favicon -> icône du site dans l'onglet du navigateur
// explication de la méthode use() plus bas (ligne 60)

const authRouter = express.Router();
const characterRouter = express.Router();
const formRouter = express.Router();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "/src/views"));

app.use(favicon(path.join(process.cwd(), 'public/assets/favicon', 'favicon.ico')));
app.use("/img" , express.static(path.join(process.cwd(), "/public/assets/img/")));
app.use('/stylesheets', express.static(path.join(process.cwd(), '/public/assets/stylesheets/')));
app.use(express.urlencoded({ extended: false }));

app.use("/liste", characterRouter);
app.use("/se-connecter", authRouter);
app.use("/form", formRouter);

// permet de stocker des données de sessions dans un store (par défaut dans la mémoire)
// et de les récupérer dans les requêtes suivantes
app.use(
    session({
        secret: "aYF8ISbYkXvzsrA4LVvRj6LQo5gLBqUX", // clé de chiffrement du cookie de session, https://www.random.org/strings/
        resave: false, // true pour sauvegarder la session à chaque requête même si elle n'a pas changé / false pour sauvegarder uniquement si elle a changé (performances), true est déprécié
        saveUninitialized: false, // true pour sauvegarder une session vide dans le store, false pour ne pas la sauvegarder (performances), true est déprécié
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semaine
            secure: false, // true pour https(en production), false pour http 
            httpOnly: true, // true pour empêcher l'accès au cookie depuis le javascript du client (document.cookie), aide contre les attaques XSS
            sameSite: 'lax' // 'lax' pour permettre certaines requêtes (les GET) cross-site tout en offrant une protection contre les attaques CSRF
        },
        rolling: true, // reset maxAge à chaque requête
    })
);

// middleware pour rendre des données de sessions disponibles sur toutes les routes
// res.locals est un objet d'Express qui contient des variables locales utilisables dans les vues entre les cycles de requête / réponse
app.use((req, res, next) => {
    res.locals.name = req.session.name;
    res.locals.logged = req.session.isLogged;
    res.locals.isAdmin = req.session.isAdmin;
    next();
});

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
