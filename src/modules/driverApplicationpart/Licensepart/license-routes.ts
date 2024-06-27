import { Router } from 'express';
import { createLicense, getLicenses, updateLicense, deleteLicense } from '../Licensepart/license-controller';

const router = Router();

router.post('/create', createLicense);
router.get('/getall', getLicenses);
router.put('/update/:id', updateLicense);
router.delete('/delete/:id', deleteLicense);

export default router;
