import { Router } from 'express';
const router = Router();
import * as companyController from '../companyProfile/companyprofile-controller';
import { authenticateUsers,authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';

router.post('/create',authenticateSuperAdminAndAdmin, companyController.createCompany);
router.get('/getAll',authenticateUsers,cloudinaryMiddleware, companyController.getAllCompanies);
router.get('/get/:id',cloudinaryMiddleware, companyController.getCompanyById);

router.put('/update/:id', authenticateUsers, companyController.updateCompany);
router.delete('/delete/:id', authenticateUsers, companyController.deleteCompany);

export default router;
