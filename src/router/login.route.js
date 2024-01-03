import express from 'express';
import { loginControler, loginPostControler, registerControler } from '../controller/login.js';


const loginRouter = express.Router();

loginRouter.get('/', loginControler);

loginRouter.post('/', loginPostControler);

loginRouter.get('/auth', registerControler);

// loginRouter.post('/auth', registerPostControler);

export default loginRouter;