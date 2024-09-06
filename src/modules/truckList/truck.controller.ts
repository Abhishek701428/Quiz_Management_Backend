import { Request, Response } from 'express';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import Truck from '../truckList/truck.models';
import UserModel from '../../modules/authUsers/usersModels';
// Create a truck
export const createTruck = async (req: Request, res: Response) => {
  try {
    cloudinaryMiddleware(req, res, async function (err: any) {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const user = (req as any).user;
      const adminId = user.adminId;

      const truckData = {
        ...req.body,
        createdBy: user._id,
        adminId
      };

      // Handle file uploads from req.cloudinaryUrls
      const cloudinaryUrls = (req as any).cloudinaryUrls;
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

export const updateTruck = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = (req as any).user._id;

    cloudinaryMiddleware(req, res, async function (err: any) {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const truck = await Truck.findById(id);

      if (!truck) {
        return res.status(404).json({ message: "Truck not found" });
      }

      const truckData = { ...req.body };

      // Handle file uploads from req.cloudinaryUrls
      const cloudinaryUrls = (req as any).cloudinaryUrls;
      if (cloudinaryUrls) {
        truckData.uploadDocument = cloudinaryUrls['uploadDocument'] || truckData.uploadDocument;
        truckData.uploadDocument1 = cloudinaryUrls['uploadDocument1'] || truckData.uploadDocument1;
        truckData.uploadDocument2 = cloudinaryUrls['uploadDocument2'] || truckData.uploadDocument2;
        truckData.uploadDocument3 = cloudinaryUrls['uploadDocument3'] || truckData.uploadDocument3;
      }

      truck.set(truckData);

      truck.updatedBy = userId;

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
    const user = (req as any).user;

    if (!user || !user._id) {
      console.log('User not authenticated or no user ID present.');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let query = {};

    if (user.usertype === 'superadmin') {
      // Superadmin sees all trucks
      query = {};
    } else if (user.usertype === 'admin') {
      // Admin sees trucks created by themselves or their associated users
      const userIds = await getUserIdsCreatedByAdmin(user._id);
      query = { $or: [{ createdBy: user._id }, { createdBy: { $in: userIds } }] };
    } else {
      // Regular users see only trucks they created
      query = { createdBy: user._id };
    }

    const trucks = await Truck.find(query);
    res.status(200).json(trucks);
  } catch (error) {
    console.error('Error fetching trucks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getUserIdsCreatedByAdmin = async (adminId: string) => {
  const users = await UserModel.find({ adminId: adminId }).select('_id');
  return users.map(user => user._id.toString());
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
