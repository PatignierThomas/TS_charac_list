import express from 'express';
import { accountView } from '../controller/account.js';

const accountRouter = express.Router();

accountRouter.get("/", accountView)

export default accountRouter;