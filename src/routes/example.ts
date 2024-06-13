import { Router } from 'express';
import { exampleController } from '../controllers/exampleController';

const router = Router();

router.get('/', exampleController.getExample);
router.post('/validate', exampleController.validateExample);

export default router;
