import { Schema, Document, model, Types } from 'mongoose'; // Import Types from mongoose

enum TruckStatus {
    APPROVED = 'APPROVED',
    PENDING = 'PENDING',
    EXPIRING = 'EXPIRING'
}

interface IDriver extends Document {
    driverName: string;
    address: string;
    serialNumber: string;
    uploadDocument1: string;
    license: string;
    licenseExpirationDate: Date;
    uploadDocument2: string;
    driverDOTMedical: string;
    medicalExpirationDate: Date;
    uploadDocument3: string;
    dmvDrivingRecord: string;
    uploadDocument4: string;
    pullRecordLatest: string;
    uploadDocument5: string;
    workAuthorization: string;
    workAuthorizationExpirationDate: Date;
    uploadDocument6: string;
    previousLicenseNumber: string;
    previouslicensenumber: boolean;
    previousAddressLast10Years: string;
    drivingExperience: number;
    drivingexperience: boolean
    equipmentType: string;
    equipmentDates: string;
    approxMiles: number;
    numberOfPreviousEmployers: number;
    companyName: string;
    companyAddress: string;
    companyDates: string;
    companyPhone: string;
    companyEmail: string;
    federalMotorCarrierSafetyRegulations1: boolean;
    federalMotorCarrierSafetyRegulations2: boolean;
    controlledSubstanceAlcoholQuestionnaire: string;
    uploadDocument7: string;
    driverRoadTestExaminationForm: string;
    uploadDocument8: string;
    companyPolicy: string;
    uploadDocument9: string;
    drugAlcoholClearingHouseConsentForm: string;
    uploadDocument10: string;
    randomDrugAlcoholTestingConsentForm: string;
    uploadDocument11: string;
    newHirePriorSevenDayWorkStatement: string;
    uploadDocument12: string;
    newHireControlCustodyForm: string;
    insuranceDocument: string;
    newHireDrugTestingResult: string;
    uploadDocument13: string;
    clearingHouseAnnualQuery: string;
    uploadDocument14: string;
    addedBy: Types.ObjectId;
    mcNumber: number;
    status: TruckStatus;
}

const DriverSchema: Schema = new Schema({
    driverName: { type: String, required: true },
    address: { type: String, required: true },
    serialNumber: { type: String, required: true },
    uploadDocument1: { type: String, required: true },
    license: { type: String, required: true },
    licenseExpirationDate: { type: Date, required: true },
    uploadDocument2: { type: String, required: true },
    driverDOTMedical: { type: String, required: true },
    medicalExpirationDate: { type: Date, required: true },
    uploadDocument3: { type: String, required: true },
    dmvDrivingRecord: { type: String, required: true },
    uploadDocument4: { type: String, required: true },
    pullRecordLatest: { type: String, required: true },
    uploadDocument5: { type: String, required: true },
    workAuthorization: { type: String, required: true },
    workAuthorizationExpirationDate: { type: Date, required: true },
    uploadDocument6: { type: String, required: true },
    previousLicenseNumber: { type: String, required: true },
    previouslicensenumber: { type: Boolean, required: true },
    previousAddressLast10Years: { type: String, required: true },
    drivingExperience: { type: Number, required: true },
    drivingexperience: { type: Boolean, required: true },
    equipmentType: { type: String, required: true },
    equipmentDates: { type: String, required: true },
    approxMiles: { type: Number, required: true },
    numberOfPreviousEmployers: { type: Number, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyDates: { type: String, required: true },
    companyPhone: { type: String, required: true },
    companyEmail: { type: String, required: true },
    federalMotorCarrierSafetyRegulations1: { type: Boolean, required: true },
    federalMotorCarrierSafetyRegulations2: { type: Boolean, required: true },
    controlledSubstanceAlcoholQuestionnaire: { type: String, required: true },
    uploadDocument7: { type: String, required: true },
    driverRoadTestExaminationForm: { type: String, required: true },
    uploadDocument8: { type: String, required: true },
    companyPolicy: { type: String, required: true },
    uploadDocument9: { type: String, required: true },
    drugAlcoholClearingHouseConsentForm: { type: String, required: true },
    uploadDocument10: { type: String, required: true },
    randomDrugAlcoholTestingConsentForm: { type: String, required: true },
    uploadDocument11: { type: String, required: true },
    newHirePriorSevenDayWorkStatement: { type: String, required: true },
    uploadDocument12: { type: String, required: true },
    newHireControlCustodyForm: { type: String, required: true },
    insuranceDocument: { type: String, required: true },
    newHireDrugTestingResult: { type: String, required: true },
    uploadDocument13: { type: String, required: true },
    clearingHouseAnnualQuery: { type: String, required: true },
    uploadDocument14: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mcNumber: { type: Number, required: true },
    status: { type: String, enum: Object.values(TruckStatus), required: true },
});

const Driver = model<IDriver>('Driver', DriverSchema);

export default Driver;
