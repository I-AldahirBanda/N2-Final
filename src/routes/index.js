import { Router } from 'express';
import { userRoutes } from './UserRoutes.js';
import { roleRoutes } from './RoleRoutes.js';
import { postRoutes } from './PostRoutes.js';
import { categoryRoutes } from './CategoryRoutes.js';
import { commentRoutes } from './CommentRoutes.js';

const router = Router();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/roles', roleRoutes);
router.use('/api/v1/posts', postRoutes);
router.use('/api/v1/categories', categoryRoutes);
router.use('/api/v1/comments', commentRoutes);

export { router };
