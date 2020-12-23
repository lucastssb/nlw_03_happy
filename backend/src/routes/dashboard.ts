import { Router } from 'express';

import authMiddleware from '../middlewares/auth';
import DashboardController from '../controllers/DashboardController';


const router = Router();

router.get('/',authMiddleware , DashboardController.index);
router.delete('/delete/:id',authMiddleware , DashboardController.delete);
router.put('/update/:id',authMiddleware , DashboardController.update);

export default router;