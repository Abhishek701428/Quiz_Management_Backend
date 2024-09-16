import { Request, Response, NextFunction } from 'express';
import UserModel from '../modules/authUsers/usersModels'; 

const getUserIdsCreatedByAdmin = async (adminId: string) => {
  const users = await UserModel.find({ adminId: adminId }).select('_id');
  return users.map(user => user._id.toString());
};

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;

    if (!user || !user._id) {
      console.log('User not authenticated or no user ID present.');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let query = {};

    if (user.usertype === 'superadmin') {
      query = {}; // Superadmin sees all trucks
    } else if (user.usertype === 'admin') {
      const userIds = await getUserIdsCreatedByAdmin(user._id);
      query = { $or: [{ createdBy: user._id }, { createdBy: { $in: userIds } }] }; // Admin sees their own and their users' trucks
    } else if (user.usertype === 'user') {
      const admin = await UserModel.findOne({ _id: user.adminId });
      if (!admin) {
        return res.status(403).json({ message: 'Access denied. Admin not found.' });
      }
      const userIds = await getUserIdsCreatedByAdmin(admin._id);
      query = { $or: [{ createdBy: user._id }, { createdBy: { $in: userIds } }] }; // Regular users see their own and their admin's trucks
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
