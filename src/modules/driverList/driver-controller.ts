import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import Driver from '../driverList/driver-model';

// Create a driver
export const createDriver = async (req, res) => {
    try {

        cloudinaryMiddleware(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const user = (req as any).user;
            const adminId = user.adminId;

            const driverData = {
                ...req.body, createdBy: user._id,
                adminId,
            };

            if (req.cloudinaryUrls) {
                Object.keys(req.cloudinaryUrls).forEach(fieldname => {
                    driverData[fieldname] = req.cloudinaryUrls[fieldname];
                });
            }

            const driver = new Driver(driverData);

            try {
                await driver.validate();
                await driver.save();
                res.status(201).json(driver);
            } catch (validationError) {
                res.status(400).json({ message: validationError.message });
            }

        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a driver
export const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = (req as any).user._id;

        cloudinaryMiddleware(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const driver = await Driver.findById(id);

            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }


            if (req.cloudinaryUrls) {
                Object.keys(req.cloudinaryUrls).forEach(fieldname => {
                    driver.set(fieldname, req.cloudinaryUrls[fieldname]);
                });
            }

            driver.set(req.body);
            driver.updatedBy = userId;
            // await driver.save();
            try {
                await driver.save();
                res.status(201).json(driver);
            } catch (validationError) {
                res.status(400).json({ message: validationError.message });
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a driver
export const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        await Driver.findByIdAndDelete(id);
        res.json({ message: 'Driver deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all drivers
export const getAllDrivers = async (req , res) => {
    try {
        const query = (req as any).accessQuery; 
        const drivers = await Driver.find(query);
        res.status(200).json(drivers);
      } catch (error) {
        console.error('Error in getAllDrivers:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  };



export const getDriverbyId = async (req, res) => {
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