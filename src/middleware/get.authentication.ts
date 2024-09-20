import { Request, Response, NextFunction } from 'express';
import UserModel from '../modules/authUsers/usersModels';

// Function to get user IDs created by the admin or superadmin
const getUserIdsCreatedByAdmin = async (adminId: string) => {
  const users = await UserModel.find({ adminId: adminId }).select('_id');
  return users.map(user => user._id.toString());
};

// Middleware to handle permissions and access
export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;

    if (!user || !user._id) {
      console.log('User not authenticated or no user ID present.');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let query = {};

    if (user.usertype === 'superadmin') {
      // Superadmin can see all resources
      query = {}; 
    } else if (user.usertype === 'admin') {
      // Admin can see their own and their users' resources
      const userIds = await getUserIdsCreatedByAdmin(user._id);
      query = { $or: [{ createdBy: user._id }, { createdBy: { $in: userIds } }] };
    } else if (user.usertype === 'user') {
      // Regular user case
      if (user.adminId) {
        // If the user has an associated admin, validate admin's existence
        const admin = await UserModel.findOne({ _id: user.adminId });
        if (!admin) {
          return res.status(403).json({ message: 'Access denied. Admin not found.' });
        }

        // Regular user sees their own created resources and possibly admin's resources
        const userIds = await getUserIdsCreatedByAdmin(admin._id);
        query = { $or: [{ createdBy: user._id }, { createdBy: { $in: userIds } }] };
      } else {
        // Superadmin-created users (without adminId) only see their own resources
        query = { createdBy: user._id };
      }
    } else {
      return res.status(403).json({ message: 'Access denied. Unauthorized user type.' });
    }

    // Attach the query to the request object
    (req as any).query = query;

    next();
  } catch (error) {
    console.error('Error in authorization middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
