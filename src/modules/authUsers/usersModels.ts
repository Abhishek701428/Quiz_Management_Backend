import mongoose, { Document, Schema } from 'mongoose';
import { defaultPermissions, superadminPermissions } from './permission';

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
    companyList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
  };
  adminId?: mongoose.Types.ObjectId;
  superadminId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  usertype: { type: String, enum: ['superadmin', 'admin', 'user'], required: true },
  password: { type: String, required: true },
  permissions: { type: Object, default: defaultPermissions },
  adminId: { type: mongoose.Schema.Types.ObjectId },
  superadminId: { type: mongoose.Schema.Types.ObjectId },
});

userSchema.pre('save', function (next) {
  if (this.usertype === 'superadmin') {
    this.permissions = superadminPermissions;
  }
  next();
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
