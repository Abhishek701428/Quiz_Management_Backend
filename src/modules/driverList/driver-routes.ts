import { Router } from 'express';
const router = Router();

import * as driverController from '../driverList/driver-controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
//truck routes
router.post('/driver/create', driverController.createDriver);
router.get('/driver/getAll', cloudinaryMiddleware, driverController.getAllDrivers);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/driver/create',authenticateSuperAdminAndAdmin, driverController.createDriver);
// router.get('/driver/getAll',authenticateSuperAdminAndAdmin, driverController.getAllDrivers);

router.put('/driver/update/:id', authenticateSuperAdminAndAdmin, driverController.updateDriver);
router.delete('/driver/delete/:id', authenticateSuperAdminAndAdmin, driverController.deleteDriver);

export default router;
