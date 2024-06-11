import { Router } from 'express';
import { exampleController } from '../controllers/exampleController';

const router = Router();

router.get('/', exampleController.getExample);

export default router;
