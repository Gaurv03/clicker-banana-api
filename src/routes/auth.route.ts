import { Router } from 'express';
import { authController } from '../controllers/index';

const router = Router();

// Auth API endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router