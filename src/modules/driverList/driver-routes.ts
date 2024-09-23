import { Router } from 'express';
const router = Router();

import * as driverController from '../driverList/driver-controller';
import { authenticateUsers, authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import checkPermissions from '../../middleware/permission-middleware';
import { authorizeAccess } from '../../middleware/get.authentication';

router.post('/driver/create', authenticateUsers, checkPermissions('truckList', 'create'), driverController.createDriver);

router.get('/driver/getAll', cloudinaryMiddleware, authenticateUsers, authorizeAccess, checkPermissions('truckList', 'read'), driverController.getAllDrivers);

router.get('/driver/get/:id', cloudinaryMiddleware, authenticateUsers, checkPermissions('truckList', 'read'), driverController.getDriverbyId);

router.put('/driver/update/:id', authenticateUsers, checkPermissions('truckList', 'update'), driverController.updateDriver);

router.delete('/driver/delete/:id', authenticateUsers, checkPermissions('truckList', 'delete'), driverController.deleteDriver);

export default router;
