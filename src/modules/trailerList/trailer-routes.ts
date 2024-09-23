import { Router } from 'express';
const router = Router();

import * as trailerController from '../trailerList/trailer-controller';
import { authenticateUsers, authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import checkPermissions from '../../middleware/permission-middleware';
import { authorizeAccess } from '../../middleware/get.authentication';



router.post('/trailer/create', authenticateUsers, checkPermissions('truckList', 'create'), trailerController.createTrailer);

router.get('/trailer/getAll', authenticateUsers, authorizeAccess, cloudinaryMiddleware, checkPermissions('truckList', 'read'), trailerController.getTrailerAll);

router.get('/trailer/get/:id', cloudinaryMiddleware, authenticateUsers, checkPermissions('truckList', 'read'), trailerController.getTrailerbyId);

router.put('/trailer/update/:id', authenticateUsers, checkPermissions('truckList', 'update'), trailerController.updateTrailer);

router.delete('/trailer/delete/:id', authenticateUsers, checkPermissions('truckList', 'delete'), trailerController.deleteTrailer);

export default router;
