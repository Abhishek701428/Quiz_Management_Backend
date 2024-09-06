import mongoose, { Schema, Document } from 'mongoose';

// Define enum for status
enum TruckStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  EXPIRING = 'EXPIRING'
}

export interface Truck extends Document {
  unitNumber: string;
  vinNumber: string;
  plateNumber: string;
  expirationDate: Date;
  cabCard: string;
  uploadDocument: string;
  annualDotInspDocument: string;
  uploadDocument1: string;
  renewalDate: Date;
  purchaseDate: Date;
  purchasePrice: number;
  uploadDocument2: string;
  loanBankName: string;
  loanAccNumber: string;
  uploadDocument3: string;
  bankContact: string;
  interestRate: number;
  monthlyPayment: number;
  status: TruckStatus; // Use enum for status
  payoffDate: Date;
  prepassTransponderNumber: string;
  fuelCardNumber: string;
  textArea: string;
  createdBy: Schema.Types.ObjectId; // Reference to the user who created the truck
  adminId: Schema.Types.ObjectId;   // Reference to the admin who created the user
  superadminId: Schema.Types.ObjectId; // Reference to the superadmin who added the admin
  updatedBy: Schema.Types.ObjectId;
}

const TruckSchema: Schema<Truck> = new Schema({
  unitNumber: { type: String, required: true },
  vinNumber: { type: String, required: true },
  plateNumber: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  cabCard: { type: String, required: true },
  uploadDocument: { type: String, required: true },
  annualDotInspDocument: { type: String, required: true },
  uploadDocument1: { type: String, required: true },
  renewalDate: { type: Date, required: true },
  purchaseDate: { type: Date, required: true },
  purchasePrice: { type: Number, required: true },
  uploadDocument2: { type: String, required: true },
  loanBankName: { type: String, required: true },
  loanAccNumber: { type: String, required: true },
  uploadDocument3: { type: String, required: true },
  bankContact: { type: String, required: true },
  interestRate: { type: Number, required: true },
  monthlyPayment: { type: Number, required: true },
  status: { type: String, enum: Object.values(TruckStatus), required: true },
  payoffDate: { type: Date, required: true },
  prepassTransponderNumber: { type: String, required: true },
  fuelCardNumber: { type: String, required: true },
  textArea: { type: String },
  createdBy: { type: Schema.Types.ObjectId, required: true },
  adminId: { type: Schema.Types.ObjectId },
  superadminId: { type: Schema.Types.ObjectId },
  updatedBy: { type: Schema.Types.ObjectId },

});

const Truck = mongoose.model<Truck>('Truck', TruckSchema);

export default Truck;
