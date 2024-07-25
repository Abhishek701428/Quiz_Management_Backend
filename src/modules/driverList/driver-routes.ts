import { Router } from 'express';
const router = Router();

import * as driverController from '../driverList/driver-controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import checkPermissions from '../../middleware/permission-middleware';
import { authenticateUser } from '../../middleware/permission-authenticate';
//truck routes
router.post('/driver/create',authenticateUser, checkPermissions('truckList', 'create'), driverController.createDriver);
router.get('/driver/getAll', cloudinaryMiddleware,authenticateUser, checkPermissions('truckList', 'read'), driverController.getAllDrivers);
router.get('/driver/get/:id', cloudinaryMiddleware,authenticateUser, checkPermissions('truckList', 'read'), driverController.getDriverbyId);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/driver/create',authenticateSuperAdminAndAdmin, driverController.createDriver);
// router.get('/driver/getAll',authenticateSuperAdminAndAdmin, driverController.getAllDrivers);

router.put('/driver/update/:id', authenticateUser, checkPermissions('truckList', 'update'), driverController.updateDriver);
router.delete('/driver/delete/:id', authenticateUser, checkPermissions('truckList', 'delete'), driverController.deleteDriver);

export default router;
