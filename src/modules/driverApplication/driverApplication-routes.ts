import express from 'express';
// import { createDriver, updateDriver, getAllDrivers, deleteDriver } from '../driverApplication/driverApplication-controller';
import { createDriver, updateDriver, getAllDrivers, deleteDriver, completeDriverForm, approveDriver } from '../driverApplication/driverapplication.controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import checkPermissions from '../../middleware/permission-middleware';
import { authenticateUser } from '../../middleware/permission-authenticate';
const router = express.Router();

// Route to create a new driver with files
router.post('/create',authenticateUser, checkPermissions('truckList', 'create'), createDriver);

// Route to get all drivers
router.get('/getAll',authenticateUser, checkPermissions('truckList', 'read'), getAllDrivers);

// Route to update a driver by ID with files
router.put('/update/:id', authenticateUser, checkPermissions('truckList', 'update'), updateDriver);


// Route to delete a driver by ID
router.delete('/delete/:id', authenticateUser, checkPermissions('truckList', 'delete'), deleteDriver);

// Route for completing driver application form
router.post('/complete-form', completeDriverForm);

router.put('/approve', approveDriver);
export default router;
