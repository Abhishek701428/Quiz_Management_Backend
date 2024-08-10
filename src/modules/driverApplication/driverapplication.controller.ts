import { Request, Response } from 'express';
import { Driver } from '../driverApplication/driverApplication-model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../middleware/nodeMailermiddleware'
import * as dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.AUTH_SECRET_KEY || 'kHv5s2TfP3C6pYsB9vQeThWmZq4t7wzC'
// Create a new driver
const createDriver = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'JWT secret is not defined' });
        }
        const token = jwt.sign({ email }, jwtSecret, { expiresIn: '7d' });

        if (!token) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }
        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newDriver = new Driver({
            email,
            token,
            status: false
        });

        // await newDriver.save();
        try {
            await newDriver.validate();
            await newDriver.save();
            // res.status(201).json(newDriver);
        } catch (validationError) {
            res.status(400).json({ message: validationError.message });
        }

        const link = `http://localhost:5173?token=${token}`;
        await sendEmail(email, 'Complete your driver application', `Please complete your driver application by clicking the link: ${link}`);

        res.status(200).send('Driver application created and email sent');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// export const completeDriverForm = async (req: Request, res: Response) => {
//     try {
//         const { token, ...formData } = req.body;
//         const decoded: JwtPayload = jwt.verify(token, jwtSecret) as JwtPayload;
//         const driver = await Driver.findOne({ email: decoded.email });

//         if (!driver) {
//             return res.status(400).json({ error: 'Invalid token or driver not found' });
//         }

//         driver.set(formData);
//         // await driver.save();
//         try {
//             await driver.validate();
//             await driver.save();
//             res.status(200).send('Driver application completed');
//         } catch (validationError) {
//             res.status(400).json({ message: validationError.message });
//         }

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

export const completeDriverForm = async (req: Request, res: Response) => {
    try {
        const { email, token, ...formData } = req.body;

        if (!jwtSecret) {
            return res.status(500).json({ error: 'JWT secret is not defined' });
        }

        let driver;
        if (token) {
            try {
                jwt.verify(token, jwtSecret);
                driver = await Driver.findOne({ email });

                if (!driver) {
                    driver = new Driver({
                        email,
                        token,
                        status: true,
                        ...formData
                    });
                } else {
                    driver.set(formData);
                }
            } catch {
                return res.status(400).json({ error: 'Invalid or expired token' });
            }
        } else {
            driver = new Driver({
                email,
                status: true,
                ...formData
            });
        }

        // Save the driver
        try {
            await driver.validate();
            await driver.save();
            if (token) {
                res.status(200).send('Driver application completed');
            } else {
                res.status(201).send('Driver application created');
            }
        } catch (validationError) {
            res.status(400).json({ message: validationError.message });
        }

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
        //  await driver.save();
        try {
            await driver.validate();
            await driver.save();
            res.status(200).send('Driver approved');
        } catch (validationError) {
            res.status(400).json({ message: validationError.message });
        }


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

// Update Driver
const updateDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Driver ID is required' });
        }

        const driver = await Driver.findById(id);
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        driver.set(updateData);

        try {
            await driver.validate();
            const updatedDriver = await driver.save();
            res.status(200).json(updatedDriver);
        } catch (validationError) {
            res.status(400).json({ message: validationError.message });
        }

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
const getDrivebyId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Trailer ID is required' });
        }
        const driver = await Driver.findById(id);
        if (!driver) {
            return res.status(404).json({ message: 'Trailer not found' });
        }
        res.json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createDriver, getAllDrivers, updateDriver, deleteDriver, getDrivebyId };
