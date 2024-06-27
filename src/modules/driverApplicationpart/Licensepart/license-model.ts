import mongoose, { Document, Schema } from 'mongoose';

interface ILicense extends Document {
    State: string;
    Number: string;
    ExpirationDate: Date;
}

const LicenseSchema: Schema = new Schema({
    State: { type: String, required: true },
    Number: { type: String, required: true },
    ExpirationDate: { type: Date, required: true }
});

const License = mongoose.model<ILicense>('License', LicenseSchema);

export { License, ILicense };
