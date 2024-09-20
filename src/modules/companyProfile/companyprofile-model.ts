import mongoose, { Schema, Document } from 'mongoose';

interface ICompany extends Document {
    companyName: string;
    corporation: string;
    dot: string;
    mc: string;
    uploadDocument: string;
    kyu: string;
    kyuUploadDocument: string;
    kyuExpiration: Date;
    ny: string;
    nyUploadDocument: string;
    nyExpiration: Date;
    nmWdt: string;
    ein: string;
    w9: string;
    w9UploadDocument: string;
    iftaAcc: string;
    prepass: string;
    irpAcc: string;
    irpRenewalDate: Date;
    insuranceDocument: string;
    address: string;
    phone: number;
    pullNoticeAcc: string;
    truck: string;
    registration: string;
    registrationUploadDocument: string;
    ownerAddress: string;
    ownerPhone: number;
    ownerName: string
    ownerEmail: string;
    numberOfTrailer: number;
    trailerRegistration: Date;
    trailerUploadDocument: string;
    randomDtEnrollmentCert: string;
    randomDtUploadDocument: string;
    createdBy: Schema.Types.ObjectId;
    superadminId: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
}

const CompanySchema: Schema = new Schema({
    companyName: { type: String, required: true },
    corporation: { type: String, required: true },
    dot: { type: String, required: true },
    mc: { type: String, required: true },
    uploadDocument: { type: String, required: true },
    kyu: { type: String, required: true },
    kyuUploadDocument: { type: String, required: true },
    kyuExpiration: { type: Date, required: true },
    ny: { type: String, required: true },
    nyUploadDocument: { type: String, required: true },
    nyExpiration: { type: Date, required: true },
    nmWdt: { type: String, required: true },
    ein: { type: String, required: true },
    w9: { type: String, required: true },
    w9UploadDocument: { type: String, required: true },
    iftaAcc: { type: String, required: true },
    prepass: { type: String, required: true },
    irpAcc: { type: String, required: true },
    irpRenewalDate: { type: Date, required: true },
    insuranceDocument: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    pullNoticeAcc: { type: String, required: true },
    truck: { type: String, required: true },
    registration: { type: String, required: true },
    registrationUploadDocument: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    ownerPhone: { type: Number, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    numberOfTrailer: { type: Number, required: true },
    trailerRegistration: { type: Date, required: true },
    trailerUploadDocument: { type: String, required: true },
    randomDtEnrollmentCert: { type: String, required: true },
    randomDtUploadDocument: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    updatedBy: { type: Schema.Types.ObjectId },
    superadminId: { type: Schema.Types.ObjectId },
});

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
