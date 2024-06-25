import mongoose, { Schema, Document } from 'mongoose';

// Define enum for status
enum TrailerStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  EXPIRING = 'EXPIRING'
}

export interface Trailer extends Document {
  unitNumber: string;
  vinNumber: string;
  plateNumber: string;
  expirationDate: Date;
  cabCard: string;
  annualDotInspDocument: string;
  renewalDate: Date;
  purchaseDate: Date;
  purchasePrice: number;
  loanBankName: string;
  loanAccNumber: string;
  bankContact: string;
  interestRate: number;
  monthlyPayment: number;
  status: TrailerStatus; // Use enum for status
  payoffDate: Date;
  prepassTransponderNumber: string;
  fuelCardNumber: string;
  insuranceDocument: string;
  registrationDocument: string;
  inspectionReport: string;
  licenceDocument: string;
  textArea: string;
  addedBy: mongoose.Types.ObjectId;
}

const TruckSchema: Schema<Trailer> = new Schema({
  unitNumber: { type: String, required: true },
  vinNumber: { type: String, required: true },
  plateNumber: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  cabCard: { type: String, required: true },
  annualDotInspDocument: { type: String, required: true },
  renewalDate: { type: Date, required: true },
  purchaseDate: { type: Date, required: true },
  purchasePrice: { type: Number, required: true },
  loanBankName: { type: String, required: true },
  loanAccNumber: { type: String, required: true },
  bankContact: { type: String, required: true },
  interestRate: { type: Number, required: true },
  monthlyPayment: { type: Number, required: true },
  status: { type: String, enum: Object.values(TrailerStatus), required: true },
  payoffDate: { type: Date, required: true },
  prepassTransponderNumber: { type: String, required: true },
  fuelCardNumber: { type: String, required: true },
  insuranceDocument: { type: String, required: true },
  registrationDocument: { type: String, required: true },
  inspectionReport: { type: String, required: true },
  licenceDocument: { type: String, required: true },
  textArea: { type: String },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Trailer = mongoose.model<Trailer>('Trailer', TruckSchema);

export default Trailer;
