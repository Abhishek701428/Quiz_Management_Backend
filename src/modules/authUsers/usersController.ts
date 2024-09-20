import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import * as dotenv from "dotenv";
dotenv.config();
import { IUser } from './usersModels';
import UserModel from './usersModels';

const loginAllUsers = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required.' });
  }

  if (!password || typeof password !== 'string' || password.length < 2) {
    return res.status(400).json({ message: 'Password is required and must be at least 2 characters long.' });
  }
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role === 'superadmin') {
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name, 
        companyId: user.companyId
      },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.status(200).json({ token, name: user.name, role: user.role, companyId: user.companyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//Regitser All 
const registerAllUser = async (req: Request, res: Response) => {
  const { name, email, password, role, companyId, permissions } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User or Admin already exists' });
    }

    const requester = (req as any).user as IUser;

    // Check if the requester has the permission to create the requested role
    if (requester.role === 'admin' && role !== 'adminuser') {
      return res.status(403).json({ message: 'Admins can only register adminuser roles.' });
    }

    if (requester.role === 'superadmin' && !['admin', 'superadminuser', 'adminuser'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Superadmin can only register admin, superadminuser, or adminuser.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Set the superadminId based on the requester's role
    const superadminId = requester.role === 'superadmin' ? requester._id : requester.superadminId;
    const newUserOrAdmin = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      companyId,
      superadminId,
      adminId: requester.role === 'admin' ? requester._id : undefined,
      permissions: permissions || undefined,
    });

    try {
      await newUserOrAdmin.validate();
      await newUserOrAdmin.save();
      res.status(201).json({ message: 'User or Admin created successfully', newUserOrAdmin });
    } catch (validationError) {
      res.status(400).json({ message: validationError.message });
    }
  } catch (error) {
    console.error('Error in registerAllUser:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const changePassword = async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || typeof email !== 'string' || !/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required.' });
  }

  if (!oldPassword || typeof oldPassword !== 'string' || oldPassword.length < 2) {
    return res.status(400).json({ message: 'Old password is required and must be at least 2 characters long.' });
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 2) {
    return res.status(400).json({ message: 'New password is required and must be at least 2 characters long.' });
  }

  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    if (user.email !== email) {
      return res.status(400).json({ message: 'Provided email does not match authenticated user.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect.' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const requester = (req as any).user; 

  if (!requester) {
    return res.status(403).json({ message: 'No requester found. Access denied.' });
  }

  try {
    let users;

    if (requester.role === 'superadmin') {
      users = await UserModel.find({
        $or: [
          { role: 'admin', superadminId: requester._id },
          { role: 'superadminuser', superadminId: requester._id },
        ],
      });
    } else if (requester.role === 'admin') {
      users = await UserModel.find({
        role: 'adminuser',
        adminId: requester._id, 
      });
    } else {
      return res.status(403).json({ message: 'Access denied. You are not authorized to view users.' });
    }

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    const requester = (req as any).user as IUser;

    // Check if the requester is a superadmin or admin
    if (!['superadmin', 'admin'].includes(requester.role)) {
      return res.status(403).json({ message: 'Access denied. Only superadmins or admins can delete users.' });
    }

    const userToDelete = await UserModel.findById(id);

    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await UserModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}



export { loginAllUsers, registerAllUser, changePassword, getAllUsers, deleteUser };


