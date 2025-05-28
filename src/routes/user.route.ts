import { Router } from 'express';
import { userController } from '../controllers/index';
import { isAuth } from '../middlewares';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

// User API endpoints
router.post('/', isAuth, isAdmin, userController.addUser);
router.get('/', isAuth, isAdmin, userController.getUsers);
router.put('/:id', isAuth, isAdmin, userController.updateUser);
router.delete('/:id', isAuth, isAdmin, userController.deleteUser);
router.put('/block/:id', isAuth, isAdmin, userController.blockUser);
router.put('/unblock/:id', isAuth, isAdmin, userController.unblockUser);


export default router