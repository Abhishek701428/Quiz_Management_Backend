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

            const driverData = req.body;

            if (req.cloudinaryUrls) {
                Object.keys(req.cloudinaryUrls).forEach(fieldname => {
                    driverData[fieldname] = req.cloudinaryUrls[fieldname];
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
export const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;

        cloudinaryMiddleware(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const driver = await Driver.findById(id);

            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }

            driver.set(req.body);

            if (req.cloudinaryUrls) {
                Object.keys(req.cloudinaryUrls).forEach(fieldname => {
                    driver.set(fieldname, req.cloudinaryUrls[fieldname]);
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
export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
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