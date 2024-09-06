import { Router } from 'express';
const router = Router();

import * as truckController from './truck.controller';
import {authenticateUsers, authenticateSuperAdminAndAdmin ,} from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import checkPermissions from '../../middleware/permission-middleware';
//truck routes

router.post('/truck/create',authenticateUsers, checkPermissions('truckList', 'create'), truckController.createTruck);

router.get('/truck/getAll', cloudinaryMiddleware,authenticateUsers, checkPermissions('truckList', 'read'),truckController.getTruckAll);

router.get('/truck/get/:id', cloudinaryMiddleware,authenticateUsers, checkPermissions('truckList', 'read'),truckController.getTruckbyId);

router.put('/truck/update/:id',authenticateUsers, checkPermissions('truckList', 'update'), truckController.updateTruck);

router.delete('/truck/delete/:id',authenticateUsers, checkPermissions('truckList', 'delete'), truckController.deleteTruck);

export default router;
