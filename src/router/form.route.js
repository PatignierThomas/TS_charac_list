import express from 'express';
import { formControler, formPostControler } from '../controller/form.js';


const formRouter = express.Router();

formRouter.get('/', formControler);

formRouter.post('/', formPostControler);

export default formRouter;