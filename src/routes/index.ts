// routes/index.ts
import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import countRoute from './count.route';



const router = Router();

// Register routes
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/count', countRoute);



export default router;