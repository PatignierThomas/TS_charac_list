import express from 'express';
import { accountView, accountPost } from '../controller/account.js';

const accountRouter = express.Router();

accountRouter.get("/", accountView)

accountRouter.post("/", accountPost)

export default accountRouter;