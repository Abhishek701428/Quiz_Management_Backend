import mongoose, { Document, Schema } from 'mongoose';

interface Files extends Document {
  companyName: string;
  mcNumber: string;
  dotNumber: string;
  city: string;
  state: string;
  phoneNumber: string;
  status: 'APPROVED' | 'PENDING' | 'EXPIRING';
}

const fileSchema: Schema = new Schema(
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
  {
    timestamps: true, 
  }
);

const Files = mongoose.model<Files>('Files', fileSchema);

export default Files;
