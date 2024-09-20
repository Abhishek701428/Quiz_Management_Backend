import mongoose, { Document, Schema } from 'mongoose';
import { defaultPermissions, superadminPermissions } from './permission';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'adminuser' | 'superadminuser';
  password: string;
  permissions: {
    truckList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
    trailerList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
    driverList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
    driverApplication?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
    companyList?: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean };
  };
  companyId: mongoose.Types.ObjectId[];  
  adminId?: mongoose.Types.ObjectId;
  superadminId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['superadmin', 'admin', 'adminuser', 'superadminuser'], required: true },
  password: { type: String, required: true },
  permissions: { type: Object, default: defaultPermissions },
  companyId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  adminId: { type: mongoose.Schema.Types.ObjectId },
  superadminId: { type: mongoose.Schema.Types.ObjectId },
});

// Pre-save hook to manage permissions based on role
userSchema.pre('save', function (next) {
  if (this.role === 'superadmin') {
    this.permissions = superadminPermissions;
  } 
  next();
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
