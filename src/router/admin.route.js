import express from 'express';
import { adminView } from '../controller/admin.js';

const adminRouter = express.Router();

adminRouter.get("/", adminView)

export default adminRouter;