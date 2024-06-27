import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

import * as truckController from '../truckList/truck.controller';
import { authenticateSuperAdminAndAdmin } from '../../../middleware/authMiddleware';
import { filterByUser } from '../../../middleware/filterByUser';
import Truck from '../truckList/truck.models';
//truck routes
router.post('/truck/create',  truckController.createTruck);
router.get('/truck/getAll',  truckController.getTruckAll);
router.get('/truck/approved',  truckController.getApprovedTrucks);
router.get('/truck/pending',  truckController.getPendingTrucks);
router.get('/truck/cancelled',  truckController.getCancelledTrucks);

// for filter according by added by 

// router.get('/truck/getAll', authenticateSuperAdminAndAdmin, filterByUser(Truck), (req: Request, res: Response) => {
//     res.status(200).json((req as any).filteredRecords); 
// });
//ACCORDING ADMIN GET AND CREATE 

// router.post('/truck/create',authenticateSuperAdminAndAdmin, truckController.createTruck);
// router.get('/truck/getAll',authenticateSuperAdminAndAdmin, truckController.getTruckAll);

router.put('/truck/update/:id', authenticateSuperAdminAndAdmin, truckController.updateTruck);
router.delete('/truck/delete/:id', authenticateSuperAdminAndAdmin, truckController.deleteTruck);

export default router;
