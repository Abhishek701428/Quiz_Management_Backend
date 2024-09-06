import express from 'express';
// import { createDriver, updateDriver, getAllDrivers, deleteDriver } from '../driverApplication/driverApplication-controller';
import { createDriver, updateDriver, getAllDrivers, deleteDriver, completeDriverForm, approveDriver, getDrivebyId } from '../driverApplication/driverapplication.controller';
import {authenticateUsers, authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
import checkPermissions from '../../middleware/permission-middleware';
const router = express.Router();

// Route to create a new driver with files
router.post('/create',authenticateUsers, checkPermissions('truckList', 'create'), createDriver);

// Route to get all drivers
router.get('/getAll',authenticateUsers, checkPermissions('truckList', 'read'), getAllDrivers);

router.get('/get/:id',authenticateUsers, checkPermissions('truckList', 'read'), getDrivebyId);

// Route to update a driver by ID with files
router.put('/update/:id', authenticateUsers, checkPermissions('truckList', 'update'), updateDriver);


// Route to delete a driver by ID
router.delete('/delete/:id', authenticateUsers, checkPermissions('truckList', 'delete'), deleteDriver);

// Route for completing driver application form
router.post('/complete-form', completeDriverForm);

router.put('/approve', approveDriver);
export default router;
