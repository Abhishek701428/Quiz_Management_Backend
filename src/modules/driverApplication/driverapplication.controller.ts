import { Request, Response } from 'express';
import { Driver } from '../driverApplication/driverApplication-model';

// Create a new driver
const createDriver = async (req: Request, res: Response) => {
    try {
        const newDriver = new Driver(req.body);
        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all drivers
const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a driver by ID
const updateDriver = async (req: Request, res: Response) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a driver by ID
const deleteDriver = async (req: Request, res: Response) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        res.status(200).json({ message: 'Driver deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createDriver, getAllDrivers, updateDriver, deleteDriver };
