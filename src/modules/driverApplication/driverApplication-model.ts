import mongoose, { Document, Schema } from 'mongoose';

interface IAddress {
    FromDate: Date;
    ToDate: Date;
    City: string;
    State: string;
    Zip: string;
    Street: string;
}

// interface ILicense {
//     State: string;
//     Number: string;
//     ExpirationDate: Date;
// }

// interface IExperience {
//     TypeOfVehicleDriven: string;
//     From: Date;
//     To: Date;
//     ApproximateMileageDriven: number;
// }

// interface IAccident {
//     Date: Date;
//     Describe: string;
//     Fatalities: number;
//     Injuries: number;
// }

// interface ITrafficViolation {
//     Date: Date;
//     Violation: string;
//     State: string;
//     CommercialVehicle: boolean;
// }

interface IEmploymentHistory {
    From: Date;
    To: Date;
    Employer: string;
    Supervisor: string;
    Telephone: string;
    State: string;
    City: string;
    ZipCode: string;
    Street: string;
    SubjectToFMCSR: string;
    SubjectToCFRPart40: string;
    ReasonForLeaving: string;
}

interface IControlledSubstanceAndAlcohol {
    Date: Date;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DateOfBirth: Date;
    City: string;
    State: string;
    Zip: string;
    CellularTelephone: string;
    SocialSecurityNumber: string;
    Address: string;
    ApplicantsSignatures: string;
    DatesSigned: Date;
    ReceivedBy: string;
    ReviewedBy: string;
    Title: string;
    Dates: Date;
    To: string;
    Date1: Date;
    Telephone: string;
    Fax: string;
    Name: string;
    ApplicantsSignature: string;
    Date2: Date;
    WitnessSignature: string;
    Date3: Date;
    AlcoholTestsResult: boolean;
    AlcoholTestDates: Date[];
    PositiveControlledSubstancesResult: boolean;
    PositiveControlledSubstancesDates: Date[];
    RefusalsToBeTested: boolean;
    RefusalDates: Date[];
    PersonProvidingInfoName: string;
    PersonProvidingInfoTitle: string;
    PersonProvidingInfoCompany: string;
    PersonProvidingInfoDate: Date;
    Dear: string;
    DriversName: string;
    DriversOperatorsLicNo: string;
    DriversSocialSecNo: string;
    InquiryPersonName: string;
    InquiryPersonTitle: string;
    MotorCarrierName: string;
    MotorCarrierStreet: string;
    MotorCarrierCity: string;
    MotorCarrierState: string;
    MotorCarrierZip: string;
}

interface IDriver extends Document {
    Dates: Date;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DateOfBirth: Date;
    City: string;
    State: string;
    Zip: string;
    CellularTelephone: string;
    SocialSecurityNumber: string;
    Address: string;
    PreviousAddresses: IAddress[];
    // Licenses: ILicense[];
    // Experience: IExperience[];
    // Accidents: IAccident[];
    // TrafficViolations: ITrafficViolation[];
    DeniedSuspendedRevoked: {
        StateOfIssuance: string;
        Explanation: string;
    };
    EmploymentHistory: IEmploymentHistory[];
    Certification: {
        ApplicantsSignature: string;
        To: string;
        ApplicationReceivedBy: string;
        ApplicationReviewedBy: string;
        Name: string;
        Date: Date;
        DateOfHire: Date;
        PreEmploymentCST: {
            TimeAndDate: Date;
            ResultsReceived: Date;
        };
        FirstUsedInSafetySensitivePosition: Date;
        TerminationDate: Date;
    };
    ControlledSubstanceAndAlcohol: IControlledSubstanceAndAlcohol[];
    RoadTestExamination: {
        DriversName: string;
        State: string;
        Zip: string;
        DriversAddress: string;
        RatingOfPerformance: {
            PreTripInspection: string;
            PlacingEquipmentInOperation: string;
            UseOfVehicleControls: string;
            OperatingVehicleInTraffic: string;
            TurningVehicle: string;
            BrakingSlowingVehicle: string;
            BackingParkingVehicle: string;
            Other: string;
            Explain: string;
            TypeOfEquipmentUsed: string;
        };
        ApplicantsSignature: string;
        DateSigned: Date;
    };
    CertificateOfRoadTest: {
        DriversName: string;
        SocialSecurityNumber: string;
        OperatorsLicenseNumber: string;
        State: string;
        TypeOfPowerUnit: string;
        TypeOfTrailer: string;
        TypeOfBus: string;
    };
    CertificationOfViolations: {
        Name: string;
        Date: Date;
        Offense: string;
        Location: string;
        TypeOfVehicleOperated: string;
        DateOfCertification: Date;
        DriversSignature: string;
    };
    AnnualReviewOfDrivingRecord: {
        Text: string;
        ApplicantsSignature: string;
        ReviewDate: Date;
        ReviewedBySignature: string;
        MotorCarrierAddress: string;
    };
    email: string;
}

const AddressSchema: Schema = new Schema({
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Zip: { type: String, required: true },
    Street: { type: String, required: true }
});

// const LicenseSchema: Schema = new Schema({
//     State: { type: String, required: true },
//     Number: { type: String, required: true },
//     ExpirationDate: { type: Date, required: true }
// });

// const ExperienceSchema: Schema = new Schema({
//     TypeOfVehicleDriven: { type: String, required: true },
//     From: { type: Date, required: true },
//     To: { type: Date, required: true },
//     ApproximateMileageDriven: { type: Number, required: true }
// });

// const AccidentSchema: Schema = new Schema({
//     Date: { type: Date, required: true },
//     Describe: { type: String, required: true },
//     Fatalities: { type: Number, required: true },
//     Injuries: { type: Number, required: true }
// });

// const TrafficViolationSchema: Schema = new Schema({
//     Date: { type: Date, required: true },
//     Violation: { type: String, required: true },
//     State: { type: String, required: true },
//     CommercialVehicle: { type: Boolean, required: true }
// });

const EmploymentHistorySchema: Schema = new Schema({
    From: { type: Date, required: true },
    To: { type: Date, required: true },
    Employer: { type: String, required: true },
    Supervisor: { type: String, required: true },
    Telephone: { type: String, required: true },
    State: { type: String, required: true },
    City: { type: String, required: true },
    ZipCode: { type: String, required: true },
    Street: { type: String, required: true },
    SubjectToFMCSR: { type: String, required: true },
    SubjectToCFRPart40: { type: String, required: true },
    ReasonForLeaving: { type: String, required: true }
});

const ControlledSubstanceAndAlcoholSchema: Schema = new Schema({
    Date: { type: Date, required: true },
    FirstName: { type: String, required: true },
    MiddleName: { type: String, required: true },
    LastName: { type: String, required: true },
    DateOfBirth: { type: Date, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Zip: { type: String, required: true },
    CellularTelephone: { type: String, required: true },
    SocialSecurityNumber: { type: String, required: true },
    Address: { type: String, required: true },
    ApplicantsSignature: { type: String, required: true },
    DatesSigned: { type: Date, required: true },
    ReceivedBy: { type: String, required: true },
    ReviewedBy: { type: String, required: true },
    Title: { type: String, required: true },
    Dates: { type: Date, required: true },
    To: { type: String, required: true },
    Date1: { type: Date, required: true },
    Telephone: { type: String, required: true },
    Fax: { type: String, required: true },
    Name: { type: String, required: true },
    ApplicantsSignatures: { type: String, required: true },
    Date2: { type: Date, required: true },
    WitnessSignature: { type: String, required: true },
    Date3: { type: Date, required: true },
    AlcoholTestsResult: { type: Boolean, required: true },
    AlcoholTestDates: [{ type: Date, required: true }],
    PositiveControlledSubstancesResult: { type: Boolean, required: true },
    PositiveControlledSubstancesDates: [{ type: Date, required: true }],
    RefusalsToBeTested: { type: Boolean, required: true },
    RefusalDates: [{ type: Date, required: true }],
    PersonProvidingInfoName: { type: String, required: true },
    PersonProvidingInfoTitle: { type: String, required: true },
    PersonProvidingInfoCompany: { type: String, required: true },
    PersonProvidingInfoDate: { type: Date, required: true },
    Dear: { type: String, required: true },
    DriversName: { type: String, required: true },
    DriversOperatorsLicNo: { type: String, required: true },
    DriversSocialSecNo: { type: String, required: true },
    InquiryPersonName: { type: String, required: true },
    InquiryPersonTitle: { type: String, required: true },
    MotorCarrierName: { type: String, required: true },
    MotorCarrierStreet: { type: String, required: true },
    MotorCarrierCity: { type: String, required: true },
    MotorCarrierState: { type: String, required: true },
    MotorCarrierZip: { type: String, required: true }
});

const DriverSchema: Schema = new Schema({
    Dates: { type: Date, required: true },
    FirstName: { type: String, required: true },
    MiddleName: { type: String, required: true },
    LastName: { type: String, required: true },
    DateOfBirth: { type: Date, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Zip: { type: String, required: true },
    CellularTelephone: { type: String, required: true },
    SocialSecurityNumber: { type: String, required: true },
    Address: { type: String, required: true },
    PreviousAddresses: { type: [AddressSchema], required: true },
    // Licenses: { type: [LicenseSchema], required: true },
    // Experience: { type: [ExperienceSchema], required: true },
    // Accidents: { type: [AccidentSchema], required: true },
    // TrafficViolations: { type: [TrafficViolationSchema], required: true },
    DeniedSuspendedRevoked: {
        StateOfIssuance: { type: String, required: true },
        Explanation: { type: String, required: true }
    },
    EmploymentHistory: { type: [EmploymentHistorySchema], required: true },
    Certification: {
        ApplicantsSignature: { type: String, required: true },
        To: { type: String, required: true },
        ApplicationReceivedBy: { type: String, required: true },
        ApplicationReviewedBy: { type: String, required: true },
        Name: { type: String, required: true },
        Date: { type: Date, required: true },
        DateOfHire: { type: Date, required: true },
        PreEmploymentCST: {
            TimeAndDate: { type: Date, required: true },
            ResultsReceived: { type: Date, required: true }
        },
        FirstUsedInSafetySensitivePosition: { type: Date, required: true },
        TerminationDate: { type: Date, required: true }
    },
    ControlledSubstanceAndAlcohol: { type: [ControlledSubstanceAndAlcoholSchema], required: true },
    RoadTestExamination: {
        DriversName: { type: String, required: true },
        State: { type: String, required: true },
        Zip: { type: String, required: true },
        DriversAddress: { type: String, required: true },
        RatingOfPerformance: {
            PreTripInspection: { type: String, required: true },
            PlacingEquipmentInOperation: { type: String, required: true },
            UseOfVehicleControls: { type: String, required: true },
            OperatingVehicleInTraffic: { type: String, required: true },
            TurningVehicle: { type: String, required: true },
            BrakingSlowingVehicle: { type: String, required: true },
            BackingParkingVehicle: { type: String, required: true },
            Other: { type: String, required: true },
            Explain: { type: String, required: true },
            TypeOfEquipmentUsed: { type: String, required: true }
        },
        ApplicantsSignature: { type: String, required: true },
        DateSigned: { type: Date, required: true }
    },
    CertificateOfRoadTest: {
        DriversName: { type: String, required: true },
        SocialSecurityNumber: { type: String, required: true },
        OperatorsLicenseNumber: { type: String, required: true },
        State: { type: String, required: true },
        TypeOfPowerUnit: { type: String, required: true },
        TypeOfTrailer: { type: String, required: true },
        TypeOfBus: { type: String, required: true }
    },
    CertificationOfViolations: {
        Name: { type: String, required: true },
        Date: { type: Date, required: true },
        Offense: { type: String, required: true },
        Location: { type: String, required: true },
        TypeOfVehicleOperated: { type: String, required: true },
        DateOfCertification: { type: Date, required: true },
        DriversSignature: { type: String, required: true }
    },
    AnnualReviewOfDrivingRecord: {
        Text: { type: String, required: true },
        ApplicantsSignature: { type: String, required: true },
        ReviewDate: { type: Date, required: true },
        ReviewedBySignature: { type: String, required: true },
        MotorCarrierAddress: { type: String, required: true }
    },
    email: { type: String, unique: true, required: true }
});

const Driver = mongoose.model<IDriver>('DriverApplication', DriverSchema);

export { Driver, IDriver };
