import { Request, Response } from 'express';
import { Driver } from '../driverApplication/driverApplication-model';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../middleware/nodeMailermiddleware'
const jwtSecret = process.env.AUTH_SECRET_KEY
// Create a new driver
const createDriver = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const token = jwt.sign({ email }, jwtSecret, { expiresIn: '7d' });
        const existingDriver = await Driver.findOne({ email });

        if (existingDriver) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newDriver = new Driver({
            email,
            token,
            status: false
        });

        await newDriver.save();

        const link = `http://your-frontend-url.com/complete-form?token=${token}`;
        await sendEmail(email, 'Complete your driver application', `Please complete your driver application by clicking the link: ${link}`);

        res.status(200).send('Driver application created and email sent');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const completeDriverForm = async (req: Request, res: Response) => {
    try {
        const { token, ...formData } = req.body;
        const decoded: JwtPayload = jwt.verify(token, jwtSecret) as JwtPayload;
        const driver = await Driver.findOne({ email: decoded.email });

        if (!driver) {
            return res.status(400).json({ error: 'Invalid token or driver not found' });
        }

        driver.set(formData);
        await driver.save();

        res.status(200).send('Driver application completed');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const approveDriver = async (req, res) => {
    try {
        const { driverId, approverId } = req.body;
        const driver = await Driver.findById(driverId);

        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        driver.status = true;
        driver.approvedBy = approverId;
        await driver.save();

        res.status(200).send('Driver approved');
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
