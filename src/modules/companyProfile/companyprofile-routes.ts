import { Router } from 'express';
const router = Router();

import * as companyController from '../companyProfile/companyprofile-controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';

//truck routes
router.post('/create', companyController.createCompany);
router.get('/getAll', companyController.getAllCompanies);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/create',authenticateSuperAdminAndAdmin, companyController.createTruck);
// router.get('/getAll',authenticateSuperAdminAndAdmin, companyController.getTruckAll);

router.put('/update/:id', authenticateSuperAdminAndAdmin, companyController.updateCompany);
router.delete('/delete/:id', authenticateSuperAdminAndAdmin, companyController.deleteCompany);

export default router;
