import mongoose, { Document, Schema } from 'mongoose';

interface ICompany extends Document {
  companyName: string;
  fileUpload: string;
  description: string;
  createdBy: Schema.Types.ObjectId;
  adminId: Schema.Types.ObjectId;   
  updatedBy: Schema.Types.ObjectId;
}

const companySchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    fileUpload: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    adminId: { type: Schema.Types.ObjectId },
    updatedBy: { type: Schema.Types.ObjectId, }
  },
);

const FileManager = mongoose.model<ICompany>('FileManager', companySchema);

export default FileManager;
