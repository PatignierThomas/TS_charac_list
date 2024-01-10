import express from 'express';
import { forbiddenView, notFoundView } from '../controller/error.js';


const errorRouter = express.Router();

errorRouter.get("/403", forbiddenView)

errorRouter.get("/404", notFoundView)

export default errorRouter;