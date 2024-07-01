import { cloudinaryMiddleware } from '../../../middleware/cloudinaryMiddleware';
import Truck from '../truckList/truck.models';

// Create a truck
export const createTruck = async (req, res) => {
  try {
    // Use cloudinaryMiddleware here to handle file uploads
    cloudinaryMiddleware(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const truckData = req.body;

      // Handle file uploads from req.cloudinaryUrls
      if (req.cloudinaryUrls) {
        truckData.uploadDocument = req.cloudinaryUrls['uploadDocument'];
        truckData.uploadDocument1 = req.cloudinaryUrls['uploadDocument1'];
        truckData.uploadDocument2 = req.cloudinaryUrls['uploadDocument2'];
        truckData.uploadDocument3 = req.cloudinaryUrls['uploadDocument3'];
      }

      const truck = new Truck(truckData);
      await truck.save();
      res.status(201).json(truck);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a truck
export const updateTruck = async (req, res) => {
  try {
    const { id } = req.params;

    cloudinaryMiddleware(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const truck = await Truck.findById(id);

      if (!truck) {
        return res.status(404).json({ message: "Truck not found" });
      }

      truck.set(req.body);

      if (req.cloudinaryUrls) {
        truck.uploadDocument = req.cloudinaryUrls['uploadDocument'];
        truck.uploadDocument1 = req.cloudinaryUrls['uploadDocument1'];
        truck.uploadDocument2 = req.cloudinaryUrls['uploadDocument2'];
        truck.uploadDocument3 = req.cloudinaryUrls['uploadDocument3'];
      }

      await truck.save();
      res.status(200).json(truck);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a truck
export const deleteTruck = async (req, res) => {
  try {
    const { id } = req.params;
    await Truck.findByIdAndDelete(id);
    res.json({ message: 'Truck deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all trucks
export const getTruckAll = async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get approved trucks
export const getApprovedTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find({ status: 'APPROVED' });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending trucks
export const getPendingTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find({ status: 'PENDING' });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cancelled trucks
export const getCancelledTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find({ status: 'EXPIRING' });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
