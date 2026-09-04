import { ForgotPayload, LoginPayload, OnboardingPayload, ResetPayload } from "@/types/AuthTypes";

const RAW_API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL ?? "").trim();

export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

type JsonPrimitive = string | number | boolean | null;

type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

type RequestConfig = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    headers?: HeadersInit;
    credentials?: RequestCredentials;
    authToken?: string | null;
    query?: QueryParams;
};

export class ApiError extends Error {
    status: number;
    details: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

export const buildApiUrl = (path: string, query?: QueryParams) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const base = API_BASE_URL || window.location.origin;
    const url = new URL(`${base}${normalizedPath}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        });
    }

    return url.toString();
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
    if (response.status === 204) {
        return null;
    }

    const raw = await response.text();
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as JsonValue;
    } catch {
        return raw;
    }
};

const getErrorMessage = (body: unknown, fallback: string) => {
    if (body && typeof body === "object" && "message" in body) {
        const message = (body as { message?: unknown }).message;
        if (typeof message === "string" && message.trim()) {
            return message;
        }
    }

    if (typeof body === "string" && body.trim()) {
        return body;
    }

    return fallback;
};

const request = async <T>(path: string, config: RequestConfig = {}): Promise<T> => {
    const token = config.authToken ?? localStorage.getItem("auth_token");

    const headers = new Headers(config.headers ?? {});
    if (config.body !== undefined && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(buildApiUrl(path, config.query), {
        method: config.method ?? "GET",
        headers,
        body: config.body === undefined ? undefined : JSON.stringify(config.body),
        credentials: config.credentials,
    });

    const body = await parseResponseBody(response);
    if (!response.ok) {
        throw new ApiError(
            getErrorMessage(body, `Request failed with status ${response.status}`),
            response.status,
            body,
        );
    }

    return body as T;
};

export type SelectEntityRequest = {
    user_id: string | null;
    first_name: string | null;
    email: string | null;
    company_user_id: string | null;
    company_id: string | null;
    company_code: string | null;
    company_name: string | null;
    entity_id: string;
    entity_name: string;
};

export type AdminSubmissionQuery = {
    user_id: string;
    company_id: string;
};

export type FundingIntentResponse = Record<string, unknown>;

export type CreateEntityPayload = {
    entity_name: string;
    registration_number?: string;
    tax_identifier?: string;
    country: string;
    currency: string;
    state?: string;
    city?: string;
    address?: string;
};

export type CreateOrganizationUserPayload = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isEmployee: boolean;
    jobTitle?: string;
    entityIds: string[];
};

export type CreateRolePayload = {
    roleName: string;
    description?: string;
};

export type AssignRolePermissionsPayload = {
    roleId: string;
    permissions: string[];
};

export type AssignRoleUserPayload = {
    userId: string;
    roleId: string;
};

export type UpdateEntityPayload = {
    entity_name?: string;
    registration_number?: string;
    tax_identifier?: string;
    country?: string;
    currency?: string;
    state?: string;
    city?: string;
    address?: string;
    email?: string;
    phone?: string;
};

export type DeleteEmployeeAction = {
    action: "transfer";
    destination_entity_id: string;
} | {
    action: "deactivate";
};

export type RemoveEntityAdministratorsPayload = {
    user_ids: string[];
};

export type MakeEntityAdministratorPayload = {
    email: string;
    first_name?: string;
    last_name?: string;
};

export type CompanyEntity = {
    id: string;
    entity_name: string;
    entity_code?: string;
    registration_number?: string | null;
    tax_identifier?: string | null;
    country?: string | null;
    currency?: string | null;
    state?: string | null;
    city?: string | null;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    administrator_count?: number;
};

export type EntityAdministrator = {
    first_name?: string | null;
    last_name?: string | null;
    email: string;
};

export type CompanyUser = {
    id: string;
    company_user_id: string;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
};

export type MakeEntityAdministratorResponse = {
    user_id: string;
    company_user_id: string;
    entity_id: string;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    created_user: boolean;
    message: string;
};

// ============================================================
// SUBSCRIPTION & BILLING TYPES - MATCHING ACTUAL API RESPONSE
// ============================================================

export type PlatformModule = {
    id: string;
    code: string;
    name: string;
    description?: string | null;
    base_price: number;
    is_core: boolean;
};

// ✅ FIXED: Response has ONLY 'modules' (no 'status')
export type GetPlatformModulesResponse = {
    modules: PlatformModule[];
};

export type CalculateSubscriptionPayload = {
    // employee_count: number;
    // subscription_months: number;
    selected_modules: string[];
};

export type GetSelectedModulesResponse = {
    selected_modules: string[];
};

export type CalculateSubscriptionResponse = {

    total_amount: string;
    message?: string;
    subscription_months_left?: number;
};

export type SubscriptionCheckoutPurpose =
    | "new_subscription"
    | "add_modules"
    | "increase_employee_count"
    | "renew_subscription";

export type SubscriptionCheckoutPayload =
    | {
        purpose: "new_subscription";
        company_id: null;
        email: string;
        employee_count: number;
        subscription_months: number;
        selected_modules: string[];
        payment_provider: "flutterwave";
    }
    | {
        purpose: "add_modules";
        company_id: string;
        email: string;
        employee_count: 0;
        subscription_months: 0;
        selected_modules: string[];
        payment_provider: "flutterwave";
    }
    | {
        purpose: "increase_employee_count";
        company_id: string;
        email: string;
        employee_count: number;
        subscription_months: 0;
        selected_modules: [];
        payment_provider: "flutterwave";
    }
    | {
        purpose: "renew_subscription";
        company_id: string;
        email: string;
        employee_count: number;
        subscription_months: number;
        selected_modules: string[];
        payment_provider: "flutterwave";
    };

export type SubscriptionCheckoutResponse = {
    status: boolean;
    message: string;
    payment_url: string;
};

// ✅ FIXED: Matching actual subscription response
export type SubscriptionModule = {
    module_id: string;
    module_name: string;
    module_code: string;
    module_base_price: string;
};

export type SubscriptionStatus = "active" | "pending" | string;

// ✅ FIXED: Matching actual response structure
export type CompanySubscription = {
    subscription_id: string;
    subscription_status: SubscriptionStatus;
    subscription_months: number;
    total_price: string;
    subscribed_employee_count: number;
    starts_at: string;
    expires_at: string;
    modules: SubscriptionModule[];
};

// ✅ FIXED: Response is the subscription object directly
export type GetSubscriptionResponse = CompanySubscription;

// ============================================================
// API OBJECTS
// ============================================================

export const subscriptionApi = {
    getModules: () =>
        request<GetPlatformModulesResponse>("/modules/get_modules", {
            method: "GET",
            credentials: "include",
        }),

    getSelectedModules: (payload: { selected_modules: string[] }) =>
        request<GetSelectedModulesResponse>("/system_settings/modules/add_modules", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),


    calculate: (payload: CalculateSubscriptionPayload) =>
        request<CalculateSubscriptionResponse>("/system_settings/modules/add_modules", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    getCurrent: () =>
        request<GetSubscriptionResponse>("/system_settings/company/subscription", {
            method: "GET",
            credentials: "include",
        }),

    checkout: (payload: SubscriptionCheckoutPayload) =>
        request<SubscriptionCheckoutResponse>("/platform/subscription/checkout", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),
};

export const authApi = {
    checkAuth: (token: string) =>
        request<Record<string, unknown> | null>("/auth/check_auth", {
            method: "GET",
            authToken: token,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        }),

    onboardingCompany: (payload: OnboardingPayload) =>
        request<unknown>("/onboarding/company/onboard", {
            method: "POST",
            body: payload,
        }),

    login: (payload: LoginPayload) =>
        request<unknown>("/auth/login", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    selectEntity: (payload: SelectEntityRequest) =>
        request<unknown>("/auth/login/from_entity", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    forgotPassword: (payload: ForgotPayload) =>
        request<unknown>("/auth/forgot_password", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    resetPassword: (payload: ResetPayload) =>
        request<unknown>("/auth/reset_password", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),
};

export const employeeApi = {
    validateEmployeeToBeOnboarded: (token: string) =>
        request<unknown>(`/validate_employee_to_be_onboarded/${encodeURIComponent(token)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }),

    sendEmployeeInviteLink: <T>(payload: T) =>
        request<unknown>("/send_employee_invite_link", {
            method: "POST",
            body: payload,
        }),

    submitEmployeeOnboarding: <T>(payload: T) =>
        request<unknown>("/employee_onboarding_submission", {
            method: "POST",
            body: payload,
        }),

    fetchAllOnboardingSubmissions: (query: AdminSubmissionQuery) =>
        request<unknown>("/fetch_all_onboarding_submission", {
            method: "GET",
            query,
        }),

    fetchSingleOnboardingSubmission: (query: AdminSubmissionQuery) =>
        request<unknown>("/fetch_single_onboarding_submission", {
            method: "GET",
            query,
        }),
};

export const fundingApi = {
    fundCompanyWallet: (payload: FundingIntentResponse) =>
        request<unknown>("/fund_company_wallet", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),
};

export const organizationApi = {
    createEntity: (payload: CreateEntityPayload) =>
        request<string>("/system_settings/entity/create", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    createUser: (payload: CreateOrganizationUserPayload) =>
        request<unknown>("/create/user", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    createRole: (payload: CreateRolePayload) =>
        request<unknown>("/create/role", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    assignRolePermissions: (payload: AssignRolePermissionsPayload) =>
        request<unknown>("/role/assign-permissions", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    assignUserRole: (payload: AssignRoleUserPayload) =>
        request<unknown>("/role/assign-user", {
            method: "POST",
            body: payload,
            credentials: "include",
        }),

    getAllEntities: () =>
        request<{ company_entities: CompanyEntity[] }>("/system_settings/entity/all", {
            method: "GET",
            credentials: "include",
        }),

    getEntityById: (id: string) =>
        request<CompanyEntity>(`/system_settings/entity/${id}`, {
            method: "GET",
            credentials: "include",
        }),

    updateEntity: (id: string, payload: UpdateEntityPayload) =>
        request<{ status: boolean; message: string }>(`/system_settings/entity/${id}/update`, {
            method: "PATCH",
            body: payload,
            credentials: "include",
        }),

    deleteEntity: (id: string, payload: DeleteEmployeeAction) =>
        request<{ status: boolean; message: string }>(`/system_settings/entity/${id}/delete`, {
            method: "DELETE",
            body: payload,
            credentials: "include",
        }),

    getEntityAdministrators: (id: string) =>
        request<EntityAdministrator[]>(`/system_settings/entity/${id}/administrators`, {
            method: "GET",
            credentials: "include",
        }),

    removeEntityAdministrators: (id: string, payload: RemoveEntityAdministratorsPayload) =>
        request<{ success: boolean; message: string }>(`/system_settings/entity/${id}/remove_administrators`, {
            method: "DELETE",
            body: payload,
            credentials: "include",
        }),

    getAllCompanyUsers: () =>
        request<CompanyUser[]>("/system_settings/company_users/all", {
            method: "GET",
            credentials: "include",
        }),

    getEntityUsers: (id: string) =>
        request<CompanyUser[]>(`/system_settings/entity/${id}/users`, {
            method: "GET",
            credentials: "include",
        }),

    makeEntityAdministrator: (id: string, payload: MakeEntityAdministratorPayload) =>
        request<MakeEntityAdministratorResponse>(`/system_settings/entity/${id}/make_administrator`, {
            method: "POST",
            body: payload,
            credentials: "include",
        }),
};