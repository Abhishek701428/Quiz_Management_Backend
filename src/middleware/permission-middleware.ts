import { Request, Response, NextFunction } from 'express';
import UserModel from '../modules/authUsers/usersModels';

const checkPermissions = (resource: string, action: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;

        if (!user || !user._id) {
            console.log('Permission Denied: User ID is undefined.');
            return res.status(401).json({ message: 'Unauthorized', permissionsDenied: true });
        }

        const userFromDb = await UserModel.findById(user._id);

        if (!userFromDb) {
            console.log(`Permission Denied: User with ID ${user._id} not found.`);
            return res.status(403).json({ message: 'User not found', permissionsDenied: true });
        }

        // Allow permission updates only for superadmins and admins
        if (userFromDb.role === 'superadmin' || userFromDb.role === 'admin') {
            return next();
        }
        // For other actions, check resource permissions
        const resourcePermissions = userFromDb.permissions[resource];

        if (!resourcePermissions) {
            console.log(`Permission Denied: No permissions set for resource ${resource}.`);
            return res.status(403).json({ message: 'Forbidden', permissionsDenied: true });
        }

        if (resourcePermissions[action]) {
            return next(); 
        } else {
            console.log(`Permission Denied: User with ID ${user._id} does not have ${action} permission on ${resource}.`);
            return res.status(403).json({ message: 'Forbidden', permissionsDenied: true });
        }
    } catch (error) {
        console.error('Error checking permissions:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

export default checkPermissions;
