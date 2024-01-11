import express from 'express';
import { adminView, adminCharacterView, adminCharacterPost } from '../controller/admin.js';
import { editorView } from '../controller/editList.js';

const adminRouter = express.Router();

adminRouter.get("/", adminView)

adminRouter.post("/", adminView)

adminRouter.get("/liste/add", adminCharacterView)

adminRouter.post("/liste/add", adminCharacterPost)

adminRouter.get("/liste/modifier/:id", editorView)

adminRouter.post("/liste/modifier/:id", adminCharacterPost)

export default adminRouter;