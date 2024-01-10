import express from 'express';
import homeView from '../controller/home.js';
import listRouter from './list.route.js';
import loginRouter from './login.route.js';
import formRouter from './form.route.js';
import accountRouter from './account.route.js';
import errorRouter from './error.route.js';
import adminRouter from './admin.route.js';

const indexRouter = express.Router();

const loggedOnly = (req, res, next) => {
    if (req.session.isLogged) {
        next();
    } else {
        res.redirect("/error/403");
    }
};

const adminOnly = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect("/error/403");
    }
}

indexRouter.get('/', homeView);

indexRouter.use('/liste', listRouter);

indexRouter.use('/se-connecter', loginRouter);

indexRouter.use('/form', formRouter);

indexRouter.use("/account", loggedOnly,  accountRouter);

indexRouter.use("/admin", adminOnly, adminRouter)

indexRouter.use('/error', errorRouter);

indexRouter.get("*", (req, res) => {
    res.redirect("/error/404");
});


export default indexRouter;