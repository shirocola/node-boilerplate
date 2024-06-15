import { Router } from 'express';
import exampleRoutes from './example';
import userRoutes from './user';

const router = Router();

router.use('/example', exampleRoutes);
router.use('/users', userRoutes);

export default router;
