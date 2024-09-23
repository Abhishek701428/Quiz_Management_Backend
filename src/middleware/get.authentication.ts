import { Request, Response, NextFunction } from 'express';
import UserModel from '../modules/authUsers/usersModels';

// Helper function to get admin's user IDs
const getAdminUserIds = async (adminId: string) => {
  const users = await UserModel.find({ adminId }).select('_id');
  return users.map(user => user._id);
};

export const authorizeAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const role = user.role;

    let query = {};

    if (role === 'superadmin') {
      // Superadmin can view all data (trucks, trailers, drivers, etc.)
      query = {};
    } else if (role === 'admin') {
      // Admin can view entities created by their own admin users
      const adminUsers = await getAdminUserIds(user._id);
      query = { createdBy: { $in: [user._id, ...adminUsers] } };
    } else if (role === 'superadminuser') {
      // Superadminuser can view all entities for the assigned company
      query = { companyId: user.companyId };
    } else if (role === 'adminuser') {
      // Admin user can view entities created by themselves and all admin users associated with their parent admin
      const adminUserIds = await getAdminUserIds(user.adminId);
      query = { createdBy: { $in: [user._id, user.adminId, ...adminUserIds] } };
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }


    (req as any).accessQuery = query;
    next();
  } catch (error) {
    console.error('Error in authorizeAccess middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
