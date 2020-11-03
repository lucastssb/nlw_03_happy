import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import OrphanageController from '../controllers/OrphanagesController';

const router = Router();
const upload = multer(uploadConfig);

router.get('/:id', OrphanageController.show);
router.get('/', OrphanageController.index);
router.post('/', upload.array('images'), OrphanageController.create);

export default router;