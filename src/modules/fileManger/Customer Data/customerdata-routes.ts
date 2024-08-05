import { Router } from 'express';
const router = Router();

import * as CustomerData from '../Customer Data/customerdata-controller';
import { authenticateSuperAdminAndAdmin } from '../../../middleware/authMiddleware';
//truck routes
router.post('/create', CustomerData.createCompany);
router.get('/getAll', CustomerData.getAllCompanies);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/driver/create',authenticateSuperAdminAndAdmin, driverController.createDriver);
// router.get('/driver/getAll',authenticateSuperAdminAndAdmin, driverController.getAllDrivers);

router.put('/update/:id', authenticateSuperAdminAndAdmin, CustomerData.updateCompany);
router.delete('/delete/:id', authenticateSuperAdminAndAdmin, CustomerData.deleteCompany);

export default router;
