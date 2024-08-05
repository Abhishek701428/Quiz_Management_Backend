import { Request, Response } from 'express';
import { cloudinaryMiddleware } from '../../../middleware/cloudinaryMiddleware';
import Truck from '../truckList/truck.models';

// Create a truck
export const createTruck = async (req: Request, res: Response) => {
  try {
    cloudinaryMiddleware(req, res, async function (err: any) {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const truckData = { ...req.body };

      const cloudinaryUrls = (req as any).cloudinaryUrls;

      // Handle file uploads
      if (cloudinaryUrls) {
        truckData.uploadDocument = cloudinaryUrls['uploadDocument'] || truckData.uploadDocument;
        truckData.uploadDocument1 = cloudinaryUrls['uploadDocument1'] || truckData.uploadDocument1;
        truckData.uploadDocument2 = cloudinaryUrls['uploadDocument2'] || truckData.uploadDocument2;
        truckData.uploadDocument3 = cloudinaryUrls['uploadDocument3'] || truckData.uploadDocument3;
      }

      const truck = new Truck(truckData);

      try {
        await truck.validate();
        await truck.save();
        res.status(201).json(truck);
      } catch (validationError) {
        res.status(400).json({ message: validationError.message });
      }
    });
  } catch (error) {
    console.error('Error in createTruck:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//update Truck
export const updateTruck = async (req: Request, res: Response) => {
  try {
    cloudinaryMiddleware(req, res, async function (err: any) {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const { id } = req.params;
      const truckData = { ...req.body };

      const cloudinaryUrls = (req as any).cloudinaryUrls;

      // Handle file uploads
      if (cloudinaryUrls) {
        truckData.uploadDocument = cloudinaryUrls['uploadDocument'] || truckData.uploadDocument;
        truckData.uploadDocument1 = cloudinaryUrls['uploadDocument1'] || truckData.uploadDocument1;
        truckData.uploadDocument2 = cloudinaryUrls['uploadDocument2'] || truckData.uploadDocument2;
        truckData.uploadDocument3 = cloudinaryUrls['uploadDocument3'] || truckData.uploadDocument3;
      }

      const truck = await Truck.findById(id);

      if (!truck) {
        return res.status(404).json({ message: "Truck not found" });
      }

      truck.set(truckData);

      try {
        await truck.save();
        res.status(200).json(truck);
      } catch (validationError) {
        res.status(400).json({ message: validationError.message });
      }
    });
  } catch (error) {
    console.error('Error in updateTruck:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a truck
export const deleteTruck = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Truck.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    res.json({ message: 'Truck deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTruck:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all trucks
export const getTruckAll = async (req: Request, res: Response) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (error) {
    console.error('Error in getTruckAll:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a truck by ID
export const getTruckbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Truck ID is required' });
    }
    const truck = await Truck.findById(id);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    res.json(truck);
  } catch (error) {
    console.error('Error in getTruckbyId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
