import express from 'express';
import homeControler from '../controller/home.js';
import listRouter from './list.route.js';
import loginRouter from './login.route.js';
import formRouter from './form.route.js';

const indexRouter = express.Router();

indexRouter.get('/', homeControler);

indexRouter.use('/liste', listRouter);

indexRouter.use('/se-connecter', loginRouter);

indexRouter.use('/form', formRouter);

export default indexRouter;