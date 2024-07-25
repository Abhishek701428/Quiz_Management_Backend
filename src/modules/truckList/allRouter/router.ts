import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

import * as truckController from '../truckList/truck.controller';
import { authenticateSuperAdminAndAdmin ,} from '../../../middleware/authMiddleware';
import { authenticateUser } from '../../../middleware/permission-authenticate';
import { cloudinaryMiddleware } from '../../../middleware/cloudinaryMiddleware';
import checkPermissions from '../../../middleware/permission-middleware';
//truck routes
router.post('/truck/create',authenticateUser, checkPermissions('truckList', 'create'), truckController.createTruck);
router.get('/truck/getAll', cloudinaryMiddleware,authenticateUser, checkPermissions('truckList', 'read'),truckController.getTruckAll);
router.get('/truck/get/:id', cloudinaryMiddleware,authenticateUser, checkPermissions('truckList', 'read'),truckController.getTruckbyId);



//ACCORDING ADMIN GET AND CREATE 

// router.post('/truck/create',authenticateSuperAdminAndAdmin, truckController.createTruck);
// router.get('/truck/getAll',authenticateSuperAdminAndAdmin, truckController.getTruckAll);

router.put('/truck/update/:id',authenticateUser, checkPermissions('truckList', 'update'), truckController.updateTruck);
router.delete('/truck/delete/:id',authenticateUser, checkPermissions('truckList', 'delete'), truckController.deleteTruck);

export default router;
