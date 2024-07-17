import express from 'express';
import { formView, formPost } from '../controller/form.js';


const formRouter = express.Router();

formRouter.get('/', formView);

formRouter.post('/', formPost);

export default formRouter;