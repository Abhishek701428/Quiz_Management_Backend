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
    token: string;
    status: boolean;
    approvedBy: string
}

const AddressSchema: Schema = new Schema({
    FromDate: { type: Date, required: false },
    ToDate: { type: Date, required: false },
    City: { type: String, required: false },
    State: { type: String, required: false },
    Zip: { type: String, required: false },
    Street: { type: String, required: false }
});

// const LicenseSchema: Schema = new Schema({
//     State: { type: String, required: false },
//     Number: { type: String, required: false },
//     ExpirationDate: { type: Date, required: false }
// });

// const ExperienceSchema: Schema = new Schema({
//     TypeOfVehicleDriven: { type: String, required: false },
//     From: { type: Date, required: false },
//     To: { type: Date, required: false },
//     ApproximateMileageDriven: { type: Number, required: false }
// });

// const AccidentSchema: Schema = new Schema({
//     Date: { type: Date, required: false },
//     Describe: { type: String, required: false },
//     Fatalities: { type: Number, required: false },
//     Injuries: { type: Number, required: false }
// });

// const TrafficViolationSchema: Schema = new Schema({
//     Date: { type: Date, required: false },
//     Violation: { type: String, required: false },
//     State: { type: String, required: false },
//     CommercialVehicle: { type: Boolean, required: false }
// });

const EmploymentHistorySchema: Schema = new Schema({
    From: { type: Date, required: false },
    To: { type: Date, required: false },
    Employer: { type: String, required: false },
    Supervisor: { type: String, required: false },
    Telephone: { type: String, required: false },
    State: { type: String, required: false },
    City: { type: String, required: false },
    ZipCode: { type: String, required: false },
    Street: { type: String, required: false },
    SubjectToFMCSR: { type: String, required: false },
    SubjectToCFRPart40: { type: String, required: false },
    ReasonForLeaving: { type: String, required: false }
});

const ControlledSubstanceAndAlcoholSchema: Schema = new Schema({
    Date: { type: Date, required: false },
    FirstName: { type: String, required: false },
    MiddleName: { type: String, required: false },
    LastName: { type: String, required: false },
    DateOfBirth: { type: Date, required: false },
    City: { type: String, required: false },
    State: { type: String, required: false },
    Zip: { type: String, required: false },
    CellularTelephone: { type: String, required: false },
    SocialSecurityNumber: { type: String, required: false },
    Address: { type: String, required: false },
    ApplicantsSignature: { type: String, required: false },
    DatesSigned: { type: Date, required: false },
    ReceivedBy: { type: String, required: false },
    ReviewedBy: { type: String, required: false },
    Title: { type: String, required: false },
    Dates: { type: Date, required: false },
    To: { type: String, required: false },
    Date1: { type: Date, required: false },
    Telephone: { type: String, required: false },
    Fax: { type: String, required: false },
    Name: { type: String, required: false },
    ApplicantsSignatures: { type: String, required: false },
    Date2: { type: Date, required: false },
    WitnessSignature: { type: String, required: false },
    Date3: { type: Date, required: false },
    AlcoholTestsResult: { type: Boolean, required: false },
    AlcoholTestDates: [{ type: Date, required: false }],
    PositiveControlledSubstancesResult: { type: Boolean, required: false },
    PositiveControlledSubstancesDates: [{ type: Date, required: false }],
    RefusalsToBeTested: { type: Boolean, required: false },
    RefusalDates: [{ type: Date, required: false }],
    PersonProvidingInfoName: { type: String, required: false },
    PersonProvidingInfoTitle: { type: String, required: false },
    PersonProvidingInfoCompany: { type: String, required: false },
    PersonProvidingInfoDate: { type: Date, required: false },
    Dear: { type: String, required: false },
    DriversName: { type: String, required: false },
    DriversOperatorsLicNo: { type: String, required: false },
    DriversSocialSecNo: { type: String, required: false },
    InquiryPersonName: { type: String, required: false },
    InquiryPersonTitle: { type: String, required: false },
    MotorCarrierName: { type: String, required: false },
    MotorCarrierStreet: { type: String, required: false },
    MotorCarrierCity: { type: String, required: false },
    MotorCarrierState: { type: String, required: false },
    MotorCarrierZip: { type: String, required: false }
});

const DriverSchema: Schema = new Schema({
    Dates: { type: Date, required: false },
    FirstName: { type: String, required: false },
    MiddleName: { type: String, required: false },
    LastName: { type: String, required: false },
    DateOfBirth: { type: Date, required: false },
    City: { type: String, required: false },
    State: { type: String, required: false },
    Zip: { type: String, required: false },
    CellularTelephone: { type: String, required: false },
    SocialSecurityNumber: { type: String, required: false },
    Address: { type: String, required: false },
    PreviousAddresses: { type: [AddressSchema], required: false },
    // Licenses: { type: [LicenseSchema], required: false },
    // Experience: { type: [ExperienceSchema], required: false },
    // Accidents: { type: [AccidentSchema], required: false },
    // TrafficViolations: { type: [TrafficViolationSchema], required: false },
    DeniedSuspendedRevoked: {
        StateOfIssuance: { type: String, required: false },
        Explanation: { type: String, required: false }
    },
    EmploymentHistory: { type: [EmploymentHistorySchema], required: false },
    Certification: {
        ApplicantsSignature: { type: String, required: false },
        To: { type: String, required: false },
        ApplicationReceivedBy: { type: String, required: false },
        ApplicationReviewedBy: { type: String, required: false },
        Name: { type: String, required: false },
        Date: { type: Date, required: false },
        DateOfHire: { type: Date, required: false },
        PreEmploymentCST: {
            TimeAndDate: { type: Date, required: false },
            ResultsReceived: { type: Date, required: false }
        },
        FirstUsedInSafetySensitivePosition: { type: Date, required: false },
        TerminationDate: { type: Date, required: false }
    },
    ControlledSubstanceAndAlcohol: { type: [ControlledSubstanceAndAlcoholSchema], required: false },
    RoadTestExamination: {
        DriversName: { type: String, required: false },
        State: { type: String, required: false },
        Zip: { type: String, required: false },
        DriversAddress: { type: String, required: false },
        RatingOfPerformance: {
            PreTripInspection: { type: String, required: false },
            PlacingEquipmentInOperation: { type: String, required: false },
            UseOfVehicleControls: { type: String, required: false },
            OperatingVehicleInTraffic: { type: String, required: false },
            TurningVehicle: { type: String, required: false },
            BrakingSlowingVehicle: { type: String, required: false },
            BackingParkingVehicle: { type: String, required: false },
            Other: { type: String, required: false },
            Explain: { type: String, required: false },
            TypeOfEquipmentUsed: { type: String, required: false }
        },
        ApplicantsSignature: { type: String, required: false },
        DateSigned: { type: Date, required: false }
    },
    CertificateOfRoadTest: {
        DriversName: { type: String, required: false },
        SocialSecurityNumber: { type: String, required: false },
        OperatorsLicenseNumber: { type: String, required: false },
        State: { type: String, required: false },
        TypeOfPowerUnit: { type: String, required: false },
        TypeOfTrailer: { type: String, required: false },
        TypeOfBus: { type: String, required: false }
    },
    CertificationOfViolations: {
        Name: { type: String, required: false },
        Date: { type: Date, required: false },
        Offense: { type: String, required: false },
        Location: { type: String, required: false },
        TypeOfVehicleOperated: { type: String, required: false },
        DateOfCertification: { type: Date, required: false },
        DriversSignature: { type: String, required: false }
    },
    AnnualReviewOfDrivingRecord: {
        Text: { type: String, required: false },
        ApplicantsSignature: { type: String, required: false },
        ReviewDate: { type: Date, required: false },
        ReviewedBySignature: { type: String, required: false },
        MotorCarrierAddress: { type: String, required: false }
    },
    email: { type: String, unique: true, required: false },
    token: { type: String, unique: true, required: false },
    status: { type: Boolean, default: false },
    approvedBy: { type: String }
});

const Driver = mongoose.model<IDriver>('DriverApplication', DriverSchema);

export { Driver, IDriver };
