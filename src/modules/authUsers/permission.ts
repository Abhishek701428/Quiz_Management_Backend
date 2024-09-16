export const defaultPermissions = {
    truckList: {
      create: true,
      read: true,
      update: false,
      delete: false,
    },
    trailerList: {
      create: true,
      read: true,
      update: false,
      delete: false,
    },
    driverList: {
      create: true,
      read: true,
      update: false,
      delete: false,
    },
    driverApplication: {
      create: true,
      read: true,
      update: false,
      delete: false,
    },
    companyList: {
        create: true,
        read: true,
        update: false,
        delete: false,
      },
  };
  
  export const superadminPermissions = {
    truckList: { create: true, read: true, update: true, delete: true },
    trailerList: { create: true, read: true, update: true, delete: true },
    driverList: { create: true, read: true, update: true, delete: true },
    driverApplication: { create: true, read: true, update: true, delete: true },
    companyList: { create: true, read: true, update: true, delete: true },
  };
  