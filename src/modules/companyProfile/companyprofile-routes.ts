import { Router } from 'express';
const router = Router();
import * as companyController from '../companyProfile/companyprofile-controller';
import { authenticateUsers,authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
//truck routes
router.post('/create',authenticateSuperAdminAndAdmin, companyController.createCompany);
router.get('/getAll',authenticateSuperAdminAndAdmin,cloudinaryMiddleware, companyController.getAllCompanies);
router.get('/get/:id',cloudinaryMiddleware, companyController.getCompanyById);

//ACCORDING ADMIN GET AND CREATE 

// router.post('/create',authenticateSuperAdminAndAdmin, companyController.createTruck);
// router.get('/getAll',authenticateSuperAdminAndAdmin, companyController.getTruckAll);

router.put('/update/:id', authenticateSuperAdminAndAdmin, companyController.updateCompany);
router.delete('/delete/:id', authenticateSuperAdminAndAdmin, companyController.deleteCompany);

export default router;
