import { Router } from 'express';

import authRouter from './routes/auth';
import dashboardRouter from './routes/dashboard';
import orphanagesRouter from './routes/orphanages';

const router = Router();

router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/orphanages', orphanagesRouter);

export default router;