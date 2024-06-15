import { Router } from 'express';
import { exampleController } from '../controllers/exampleController';
import AppDataSource from '../ormconfig';
import { User } from '../entity/User';

const router = Router();

router.get('/', exampleController.getExample);
router.post('/validate', exampleController.validateExample);
router.get('/users', async (req, res) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await User.find();
    res.json(users);
})

export default router;
