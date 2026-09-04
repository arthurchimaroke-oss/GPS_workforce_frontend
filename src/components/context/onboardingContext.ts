export interface CompanyOnboardingRequest {
  // User Information
  user_email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;

  // Company Information
  token: string;
  company_name: string;
  company_email: string;
  company_phone?: string;
  company_website?: string;
  city?: string;
  country?: string;
  industry?: string;
  default_currency: string;
  as_employee: boolean;
  entity_details: {
    entity_name: string;
    registration_number: string;
    tax_identifier?: string;
    country: string;
    currency: string;
    state?: string;
    city?: string;
    address?: string;
  };
}

export type OnboardingData = Partial<CompanyOnboardingRequest>;

export interface OnboardingContextType {
  onboardCompany: (data: OnboardingData) => Promise<void>;
  data: OnboardingData;
  update: (fields: Partial<OnboardingData>) => void;
  getPayload: () => CompanyOnboardingRequest;
}

export interface SendInviteLink {
  email: string;
  company_id: string;
  company_name: string;
  first_name: string,
  last_name: string,
  join_date?: string,
  department: string,
  jobTitle: string,
  salary: number,
  currency: string,
  manager?: string,
  employmentType: string
}

export interface EmployeeOnboardingPayload {
  token: string;
  company_id: string;
  status: string
  profile_photo_url: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  marital_status?: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_country: string;
  address_postal_code: string;
  gov_id_type: string;
  gov_id_number: string;
  tax_id: string;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_routing_number: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  next_of_kin_name?: string;
  next_of_kin_phone?: string;
  next_of_kin_relationship?: string;

}

export interface AdminPayload {
  user_id: string,
  company_id: string
}
export interface AdminPayloadForSingle {
  user_id: string,
  company_id: string,
  id: string
}
