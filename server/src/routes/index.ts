import express from 'express';
import usersRoutes from './users.routes.js';
import levelsRoutes from './levels.routes.js';
import leaderbordRoutes from './leaderbord.routes.js';

const router = express.Router({ mergeParams: true });

router.use('/users', usersRoutes);
router.use('/levels', levelsRoutes);
router.use('/leaderbord', leaderbordRoutes);

export default router;
