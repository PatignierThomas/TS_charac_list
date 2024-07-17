import express from 'express';
import { loginView, loginPost, registerView, registerPost, logout } from '../controller/login.js';


const loginRouter = express.Router();

loginRouter.get('/', loginView);

loginRouter.post('/', loginPost);

loginRouter.get('/auth', registerView);

loginRouter.post('/auth', registerPost);

loginRouter.get('/deconnexion' , logout);

export default loginRouter;