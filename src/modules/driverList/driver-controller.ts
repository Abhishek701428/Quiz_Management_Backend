import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import Driver from '../driverList/driver-model';

// Set up storage and file filter for multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadPath = 'uploads';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const fileFilter = function (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).any();

// Create a driver
export const createDriver = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const driverData = req.body;
            // if (!req.user || !req.user._id) {
            //     return res.status(401).json({ message: "User not authenticated" });
            // }
            // driverData.addedBy = req.user._id;
            const files = req.files as Express.Multer.File[];
            if (files && files.length > 0) {
                files.forEach(file => {
                    if (file.fieldname === 'uploadDocument1') {
                        driverData.uploadDocument1 = file.filename;
                    } else if (file.fieldname === 'uploadDocument2') {
                        driverData.uploadDocument2 = file.filename;
                    } else if (file.fieldname === 'uploadDocument3') {
                        driverData.uploadDocument3 = file.filename;
                    } else if (file.fieldname === 'uploadDocument4') {
                        driverData.uploadDocument4 = file.filename;
                    } else if (file.fieldname === 'uploadDocument5') {
                        driverData.uploadDocument5 = file.filename;
                    } else if (file.fieldname === 'uploadDocument6') {
                        driverData.uploadDocument6 = file.filename;
                    } else if (file.fieldname === 'uploadDocument7') {
                        driverData.uploadDocument7 = file.filename;
                    } else if (file.fieldname === 'uploadDocument8') {
                        driverData.uploadDocument8 = file.filename;
                    } else if (file.fieldname === 'uploadDocument9') {
                        driverData.uploadDocument9 = file.filename;
                    } else if (file.fieldname === 'uploadDocument10') {
                        driverData.uploadDocument10 = file.filename;
                    } else if (file.fieldname === 'uploadDocument11') {
                        driverData.uploadDocument11 = file.filename;
                    } else if (file.fieldname === 'uploadDocument12') {
                        driverData.uploadDocument12 = file.filename;
                    } else if (file.fieldname === 'insuranceDocument') {
                        driverData.insuranceDocument = file.filename;
                    } else if (file.fieldname === 'uploadDocument13') {
                        driverData.uploadDocument13 = file.filename;
                    } else if (file.fieldname === 'uploadDocument14') {
                        driverData.uploadDocument14 = file.filename;
                    }
                });
            }

            const driver = new Driver(driverData);

            await driver.save();
            res.status(201).json(driver);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a driver
export const updateDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        upload(req, res, async function (err: any) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const driver = await Driver.findById(id);

            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }

            driver.set(req.body);

            const files = req.files as Express.Multer.File[];
            if (files && files.length > 0) {
                files.forEach(file => {
                    if (file.fieldname === 'uploadDocument1') {
                        driver.set('uploadDocument1', file.filename);
                    } else if (file.fieldname === 'uploadDocument2') {
                        driver.set('uploadDocument2', file.filename);
                    } else if (file.fieldname === 'uploadDocument3') {
                        driver.set('uploadDocument3', file.filename);
                    } else if (file.fieldname === 'uploadDocument4') {
                        driver.set('uploadDocument4', file.filename);
                    } else if (file.fieldname === 'uploadDocument5') {
                        driver.set('uploadDocument5', file.filename);
                    } else if (file.fieldname === 'uploadDocument6') {
                        driver.set('uploadDocument6', file.filename);
                    } else if (file.fieldname === 'uploadDocument7') {
                        driver.set('uploadDocument7', file.filename);
                    } else if (file.fieldname === 'uploadDocument8') {
                        driver.set('uploadDocument8', file.filename);
                    } else if (file.fieldname === 'uploadDocument9') {
                        driver.set('uploadDocument9', file.filename);
                    } else if (file.fieldname === 'uploadDocument10') {
                        driver.set('uploadDocument10', file.filename);
                    } else if (file.fieldname === 'uploadDocument11') {
                        driver.set('uploadDocument11', file.filename);
                    } else if (file.fieldname === 'uploadDocument12') {
                        driver.set('uploadDocument12', file.filename);
                    } else if (file.fieldname === 'insuranceDocument') {
                        driver.set('insuranceDocument', file.filename);
                    } else if (file.fieldname === 'uploadDocument13') {
                        driver.set('uploadDocument13', file.filename);
                    } else if (file.fieldname === 'uploadDocument14') {
                        driver.set('uploadDocument14', file.filename);
                    }
                });
            }

            await driver.save();
            res.status(200).json(driver);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a driver
export const deleteDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Driver.findByIdAndDelete(id);
        res.json({ message: 'Driver deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all drivers
export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        // const userId = req.user._id; 
        // const drivers = await Driver.find({ addedBy: userId });
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
