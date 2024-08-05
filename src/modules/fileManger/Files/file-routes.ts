import { Router } from 'express';
const router = Router();

import * as Files from '../Files/file-controller';
import { authenticateSuperAdminAndAdmin } from '../../../middleware/authMiddleware';
//truck routes
router.post('/create', Files.createCompany);
router.get('/getAll', Files.getAllCompanies);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/driver/create',authenticateSuperAdminAndAdmin, driverController.createDriver);
// router.get('/driver/getAll',authenticateSuperAdminAndAdmin, driverController.getAllDrivers);

router.put('/update/:id', authenticateSuperAdminAndAdmin, Files.updateCompany);
router.delete('/delete/:id', authenticateSuperAdminAndAdmin, Files.deleteCompany);

export default router;
