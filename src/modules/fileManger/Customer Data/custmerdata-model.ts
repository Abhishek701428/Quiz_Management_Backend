import mongoose, { Document, Schema } from 'mongoose';

interface ICompany extends Document {
  companyName: string;
  mcNumber: string;
  dotNumber: string;
  city: string;
  state: string;
  rating: number;
  phoneNumber: string;
  status: 'APPROVED' | 'PENDING' | 'EXPIRING';
}

const companySchema: Schema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    mcNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dotNumber: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['APPROVED', 'PENDING', 'EXPIRING'],
      required: true,
    },
  },
);

const CustomerData = mongoose.model<ICompany>('CustomerData', companySchema);

export default CustomerData;
