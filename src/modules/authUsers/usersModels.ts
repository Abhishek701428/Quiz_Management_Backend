import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  usertype: 'superadmin' | 'admin' | 'user';
  password: string;
  permissions: {
    truckList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
    trailerList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
    driverList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
    driverApplication?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
  };
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  usertype: {
    type: String,
    enum: ['superadmin', 'admin', 'user'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    truckList: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    trailerList: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    driverList: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    driverApplication: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
  },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
