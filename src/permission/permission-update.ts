import express from 'express';
import checkPermissions from '../middleware/permission-middleware';
import UserModel from '../modules/authUsers/usersModels';
import { authenticateUsers } from '../middleware/authMiddleware';
const router = express.Router();

// Use authentication middleware
router.use(authenticateUsers);

router.put('/update-permissions/:userId', checkPermissions('permissions', 'update'), async (req, res) => {
    const { userId } = req.params;
    const { permissions } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPermissions = ['truckList', 'trailerList', 'driverList', 'driverApplication', 'companyList'];
        const isValid = Object.keys(permissions).every(key =>
            validPermissions.includes(key) &&
            ['create', 'read', 'update', 'delete'].every(action => typeof permissions[key][action] === 'boolean')
        );

        if (!isValid) {
            console.log('Invalid permissions format:', permissions);
            return res.status(400).json({ message: 'Invalid permissions format' });
        }

        user.permissions = permissions;
        try {
            await user.validate();
            await user.save();
            return res.status(200).json({ message: 'Permissions updated successfully' });
        } catch (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
