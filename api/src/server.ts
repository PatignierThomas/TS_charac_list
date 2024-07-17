// import ES6
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import favicon from "serve-favicon";
import session, { SessionOptions } from 'express-session';

import "dotenv/config";
import router from "./router/index.route";

const app: Express = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "/src/views"));

app.use(favicon(path.join(process.cwd(), 'public/assets/favicon', 'favicon.ico')));
app.use("/img" , express.static(path.join(process.cwd(), "/public/assets/img/")));
app.use('/stylesheets', express.static(path.join(process.cwd(), '/public/assets/stylesheets/')));
app.use(express.urlencoded({ extended: false }));


const sessionOptions: SessionOptions = {
    secret: process.env.SK_SESSION as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    },
    rolling: true,
};

app.use(session(sessionOptions));

// middleware pour rendre des données de sessions disponibles sur toutes les routes
// res.locals est un objet d'Express qui contient des variables locales utilisables dans les vues entre les cycles de requête / réponse

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.name = req.session?.name;
    res.locals.logged = req.session?.isLogged;
    res.locals.isAdmin = req.session?.isAdmin;
    next();
});

app.use(router)

app.listen(process.env.LOCAL_PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.LOCAL_PORT}`);
});
