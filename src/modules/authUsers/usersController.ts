import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
// import { config } from '../../config';
import * as dotenv from "dotenv";
dotenv.config();
import { IUser } from './usersModels';  
import UserModel from './usersModels';

const loginAllUsers = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.usertype === 'superadmin') {
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
        usertype: user.usertype,
        name: user.name, // Include the user's name in the token payload
      },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '30d' }
    );
    
    res.status(200).json({ token, name: user.name, usertype: user.usertype }); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const registerAllUser = async (req: Request, res: Response) => {
  const { name, email, password, usertype } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User or Admin already exists' });
    }

    const requester = (req as any).user as IUser;
    // Check if the requester is a 'superadmin' or 'admin'
    if (!['superadmin', 'admin'].includes(requester.usertype)) {
      return res.status(403).json({ message: 'Access denied. Not a superadmin or admin.' });
    }

    // Check if the usertype is valid
    if (!['admin', 'user'].includes(usertype)) {
      return res.status(400).json({ message: 'Invalid usertype. Only "admin" or "user" is allowed.' });
    }

    // Check if the requester is 'superadmin' or 'admin' to allow registration of 'user'
    if (requester.usertype === 'user') {
      return res.status(403).json({ message: 'Access denied. Only superadmins or admins can register users.' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user or admin by the admin or superadmin with the hashed password
    const newUserOrAdmin = new UserModel({ name, email, password: hashedPassword, usertype });
    await newUserOrAdmin.save();

    res.status(201).json({ message: 'User or Admin created successfully', newUserOrAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export { loginAllUsers , registerAllUser };


