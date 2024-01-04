import express from 'express';
import session from 'express-session';
import { loginControler, loginPostControler, logoutControler, registerControler, registerPostControler } from '../controller/login.js';


const loginRouter = express.Router();

// loginRouter.use(
//     session({
//         secret: "aYF8ISbYkXvzsrA4LVvRj6LQo5gLBqUX", // clé de chiffrement du cookie de session, https://www.random.org/strings/
//         resave: false, // true pour sauvegarder la session à chaque requête même si elle n'a pas changé / false pour sauvegarder uniquement si elle a changé (performances), true est déprécié
//         saveUninitialized: false, // true pour sauvegarder une session vide dans le store, false pour ne pas la sauvegarder (performances), true est déprécié
//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semaine
//             secure: false, // true pour https(en production), false pour http 
//             httpOnly: true, // true pour empêcher l'accès au cookie depuis le javascript du client (document.cookie), aide contre les attaques XSS
//             sameSite: 'lax' // 'lax' pour permettre certaines requêtes (les GET) cross-site tout en offrant une protection contre les attaques CSRF
//         },
//         rolling: true, // reset maxAge à chaque requête
//     })
// );

// // middleware pour rendre des données de sessions disponibles sur toutes les routes
// // res.locals est un objet d'Express qui contient des variables locales utilisables dans les vues entre les cycles de requête / réponse
// loginRouter.use((req, res, next) => {
//     if(req.session?.name){
//         res.locals.session = req.session.name;
//     }
//     next();
// });


loginRouter.get('/', loginControler);

loginRouter.post('/', loginPostControler);

loginRouter.get('/auth', registerControler);

loginRouter.post('/auth', registerPostControler);

loginRouter.get('/deconnexion' , logoutControler);

export default loginRouter;