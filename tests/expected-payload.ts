type CompanyStatus = 'active';

type SoftwareCategory = 'Accountancy';

type SoftwareDetails = {
  name: string;
  buyingUrl: string;
};

type EligibilityPayload = {
  companyInformation: {
    companyName: string;
    companyHouseNumber: number;
    companyStatus: CompanyStatus;
    sicCodes: string;
    registeredAddress: string;
    postalCode: string;
  };
  softwareDetails: SoftwareDetails;
};

type UserAccountPayload = {
  emailAddress: string;
  password: string;
};

type RegisterYourInterestSoftwareISell = {
  name: string;
  category: SoftwareCategory;
};

type RegisterYourInterestPayload = {
  fullName: string;
  positionInCompany: string;
  emailAddress: string;
  softwareISell: RegisterYourInterestSoftwareISell[];
};
