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

// Add a pre-save hook to ensure superadmins and admins have all permissions
userSchema.pre('save', function (next: Function) {
  if (this.usertype === 'superadmin' || this.usertype === 'admin') {
    this.permissions = {
      truckList: { create: true, read: true, update: true, delete: true },
      trailerList: { create: true, read: true, update: true, delete: true },
      driverList: { create: true, read: true, update: true, delete: true },
      driverApplication: { create: true, read: true, update: true, delete: true },
    };
  }
  next();
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
