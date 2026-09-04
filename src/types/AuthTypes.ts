// --- Onboarding ---
// Matches docs: POST /onboarding/company/onboard
export type OnboardingPayload = {
  token: string;
  user_email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string; // required per docs

  company_name: string;
  company_email: string;
  industry?: string;
  country?: string;
  company_phone?: string;
  city?: string;
  company_website?: string;
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
};

// --- Login ---
// Matches docs: POST /auth/login body
export type LoginPayload = {
  company_code: string;
  email: string;
  password: string;
};

export type ForgotPayload = {
  email: string;
};

export type ResetPayload = {
  token: string;
  new_password: string;
};

// --- Shared auth shapes ---
export type EntityOption = {
  id: string;
  name: string;
};

export type AuthUser = Record<string, unknown> & {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  company_id?: string | null;
  company_code?: string | null;
  company_user_id?: string | null;
  active_entity_id?: string | null;
  active_entity_name?: string | null;
  is_system_administrator?: boolean;
  entities?: EntityOption[];
};


export type LoginResult =
  | { status: "success" }
  | { status: "select_entity"; entities: EntityOption[] };

// --- Context ---
export type AuthContextType = {
  isLoading: boolean;
  user: AuthUser | null;
  token: string | null;
  companyId: string | null;
  companyName: string | null;
  isSubmitting: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;

  onboarding: (payload: OnboardingPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<LoginResult | undefined>;
  selectEntity: (entity: EntityOption) => Promise<LoginResult | undefined>;
  switchEntity: (entity: EntityOption) => Promise<void>;
  forgotPassword: (payload: ForgotPayload) => Promise<any>;
  resetPassword: (payload: ResetPayload) => Promise<any>;
  logout: () => void;

  setIsSubmitting: (value: boolean) => void;
  setError: (value: string | null) => void;
};