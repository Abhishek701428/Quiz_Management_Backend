import express from 'express';
// import { createDriver, updateDriver, getAllDrivers, deleteDriver } from '../driverApplication/driverApplication-controller';
import { createDriver, updateDriver, getAllDrivers, deleteDriver } from '../driverApplication/driverapplication.controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';

const router = express.Router();

// Route to create a new driver with files
router.post('/create', createDriver);

// Route to get all drivers
router.get('/getAll', getAllDrivers);

// Route to update a driver by ID with files
router.put('/update/:id', authenticateSuperAdminAndAdmin, updateDriver);


// Route to delete a driver by ID
router.delete('/delete/:id', authenticateSuperAdminAndAdmin, deleteDriver);

export default router;
