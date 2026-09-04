
export interface CompanyInfo {
  company_name: string;
  company_id : string;
  company_logo_url?: string;
  job_title?: string;
  department?: string;
  branch_name?: string;
  employment_type?: string;
  salary?: number;
  salary_currency?: string;
  start_date?: string;
  invited_email?: string;
}

export interface FormData {
  password : string;
  profile_photo_url: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  marital_status: string;
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
  wallet_address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  next_of_kin_name: string;
  next_of_kin_phone: string;
  next_of_kin_relationship: string;
  linkedin_url: string;
  availability_date: string;
  referred_by: string;
}
