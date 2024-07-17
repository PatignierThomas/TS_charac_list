import express from 'express';
import listView , { detailView, listPost,  } from '../controller/list.js';

const listRouter = express.Router();

listRouter.get('/', listView);

listRouter.post('/', listPost);

listRouter.get('/:id', detailView);



export default listRouter;