import { Router } from "express";
import { index, show, store, update, destroy, filterByCategory } from '../controller/PostController.js';

export const postRoutes = Router();

postRoutes.get('/', index);
postRoutes.get('/:id', show);
postRoutes.post('/', store);
postRoutes.put('/:id', update);
postRoutes.delete('/:id', destroy);
postRoutes.get('/category/:categoryId', filterByCategory);
