import express, { Express, Request, Response, NextFunction } from "express";

import homeView from '../controller/home.js';
import listRouter from './list.route';
import loginRouter from './login.route';
import formRouter from './form.route';
import accountRouter from './account.route';
import errorRouter from './error.route';
import adminRouter from './admin.route';

const indexRouter = express.Router();

const loggedOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isLogged) {
        next();
    } else {
        res.redirect("/error/403");
    }
};

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isAdmin) {
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