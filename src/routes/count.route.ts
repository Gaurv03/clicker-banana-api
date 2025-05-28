import { Router } from 'express';
import { countController } from '../controllers/index';
import { isAuth } from '../middlewares';

const router = Router();

// Click count API endpoints
router.post('/', isAuth, countController.countClicks);


export default router