import { Router } from 'express';

import AuthenticationController from '../controllers/AuthenticationController';

const router = Router();

router.post('/signup', AuthenticationController.create);
router.post('/login', AuthenticationController.login);

export default router;