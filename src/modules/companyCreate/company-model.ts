import mongoose, { Schema, Document } from 'mongoose';

interface ICarrier extends Document {
  USDOTNumber: string;
  LegalName: string;
  DBAName: string;
  Address: {
    Street: string;
    City: string;
    State: string;
    Zip: string;
  };
  Phone: number;
  Email: string;
  CarrierOperation: string;
  HazardousMaterials: string[];
  OperatingAuthority: {
    Common: string;
    Contract: string;
    Broker: string;
  };
  SafetyRating: {
    Rating: string;
    ReviewDate: Date;
  };
  SMS: {
    UnsafeDriving: string;
    HoursOfServiceCompliance: string;
    DriverFitness: string;
    ControlledSubstancesAlcohol: string;
    VehicleMaintenance: string;
    HazardousMaterialsCompliance: string;
    CrashIndicator: string;
  };
  Inspections: {
    TotalInspections: number;
    DriverOutOfServiceRate: string;
    VehicleOutOfServiceRate: string;
  };
  Crashes: {
    Total: number;
    Fatal: number;
    Injury: number;
    Tow: number;
  };
  Insurance: {
    InsuranceCompany: string;
    PolicyNumber: string;
    CoverageAmount: string;
  };
  BOC3: {
    FilingStatus: string;
    ProcessAgent: string;
  };
  Vehicle: {
    TotalPowerUnits: number;
    TotalDrivers: number;
  };
  Registration: {
    Status: string;
    MCS150FormDate: Date;
  };
}

const CarrierSchema = new Schema<ICarrier>({
  USDOTNumber: { type: String, required: true },
  LegalName: { type: String, required: true },
  DBAName: { type: String, required: true },
  Address: {
    Street: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Zip: { type: String, required: true }
  },
  Phone: { type: Number, required: true },
  Email: { type: String, required: true },
  CarrierOperation: { type: String, required: true },
  HazardousMaterials: [{ type: String, required: true }],
  OperatingAuthority: {
    Common: { type: String, required: true },
    Contract: { type: String, required: true },
    Broker: { type: String, required: true }
  },
  SafetyRating: {
    Rating: { type: String, required: true },
    ReviewDate: { type: Date, required: true }
  },
  SMS: {
    UnsafeDriving: { type: String, required: true },
    HoursOfServiceCompliance: { type: String, required: true },
    DriverFitness: { type: String, required: true },
    ControlledSubstancesAlcohol: { type: String, required: true },
    VehicleMaintenance: { type: String, required: true },
    HazardousMaterialsCompliance: { type: String, required: true },
    CrashIndicator: { type: String, required: true }
  },
  Inspections: {
    TotalInspections: { type: Number, required: true },
    DriverOutOfServiceRate: { type: String, required: true },
    VehicleOutOfServiceRate: { type: String, required: true }
  },
  Crashes: {
    Total: { type: Number, required: true },
    Fatal: { type: Number, required: true },
    Injury: { type: Number, required: true },
    Tow: { type: Number, required: true }
  },
  Insurance: {
    InsuranceCompany: { type: String, required: true },
    PolicyNumber: { type: String, required: true },
    CoverageAmount: { type: String, required: true }
  },
  BOC3: {
    FilingStatus: { type: String, required: true },
    ProcessAgent: { type: String, required: true }
  },
  Vehicle: {
    TotalPowerUnits: { type: Number, required: true },
    TotalDrivers: { type: Number, required: true }
  },
  Registration: {
    Status: { type: String, required: true },
    MCS150FormDate: { type: Date, required: true }
  }
});

const CarrierModel = mongoose.model<ICarrier>('Carrier', CarrierSchema);

export default CarrierModel;
