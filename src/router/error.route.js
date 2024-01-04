import express from 'express';
import { forbiddenView } from '../controller/error.js';

const errorRouter = express.Router();

errorRouter.get("/", forbiddenView)

export default errorRouter;