import { Router } from 'express';
const router = Router();

import * as trailerController from '../trailerList/trailer-controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import checkPermissions from '../../middleware/permission-middleware';
import { authenticateUser } from '../../middleware/permission-authenticate';
//truck routes
router.post('/trailer/create', authenticateUser, checkPermissions('truckList', 'create'), trailerController.createTrailer);
router.get('/trailer/getAll', cloudinaryMiddleware, authenticateUser, checkPermissions('truckList', 'read'), trailerController.getTrailerAll);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/trailer/create',authenticateSuperAdminAndAdmin, trailerController.createTrailer);
// router.get('/trailer/getAll',authenticateSuperAdminAndAdmin, trailerController.getTrailerAll);

router.put('/trailer/update/:id', authenticateUser, checkPermissions('truckList', 'update'), trailerController.updateTrailer);
router.delete('/trailer/delete/:id', authenticateUser, checkPermissions('truckList', 'delete'), trailerController.deleteTrailer);

export default router;
