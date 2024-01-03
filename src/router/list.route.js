import express from 'express';
import listControler , { detailControler, listPostControler,  } from '../controller/list.js';

const listRouter = express.Router();

listRouter.get('/', listControler);

listRouter.post('/', listPostControler);

listRouter.get('/:id', detailControler);



export default listRouter;