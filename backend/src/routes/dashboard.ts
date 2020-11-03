import { Router } from 'express';

import authMiddleware from '../middlewares/auth';
import DashboardController from '../controllers/DashboardController';


const router = Router();

router.get('/',authMiddleware , DashboardController.index);

export default router;