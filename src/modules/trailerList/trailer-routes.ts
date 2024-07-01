import { Router } from 'express';
const router = Router();

import * as trailerController from '../trailerList/trailer-controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
//truck routes
router.post('/trailer/create', trailerController.createTrailer);
router.get('/trailer/getAll',cloudinaryMiddleware, trailerController.getTrailerAll);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/trailer/create',authenticateSuperAdminAndAdmin, trailerController.createTrailer);
// router.get('/trailer/getAll',authenticateSuperAdminAndAdmin, trailerController.getTrailerAll);

router.put('/trailer/update/:id', authenticateSuperAdminAndAdmin, trailerController.updateTrailer);
router.delete('/trailer/delete/:id', authenticateSuperAdminAndAdmin, trailerController.deleteTrailer);

export default router;
