export type OrganizationEntity = {
    id: string;
    name: string;
    registrationNumber: string;
    taxIdentifier?: string;
    country: string;
    currency: string;
    state?: string;
    city?: string;
    address?: string;
    employees: number;
};

export type OrganizationUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isEmployee: boolean;
    jobTitle?: string;
    entityIds: string[];
    roleIds: string[];
    status: "Invited" | "Active";
};

export type OrganizationRole = {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    isSystem?: boolean;
};

export type PermissionDefinition = {
    id: string;
    label: string;
    description: string;
};

export type PermissionGroup = {
    module: string;
    permissions: PermissionDefinition[];
};

export const companyProfile = {
    name: "OmniCore Holdings",
    website: "https://omnicore.work",
    email: "admin@omnicore.work",
    phoneCode: "+234",
    phoneNumber: "8035550193",
    industry: "Technology Services",
    overview:
        "GPS organization settings control legal entities, access, roles, and permissions. Administrators create entities first, then invite users, connect them to entities, and grant role-based access.",
};

export const sampleEntities: OrganizationEntity[] = [
    {
        id: "entity-ng",
        name: "Omni Nigeria Ltd",
        registrationNumber: "RC-447821",
        taxIdentifier: "TIN-234-889",
        country: "Nigeria",
        currency: "NGN",
        state: "Lagos",
        city: "Lekki",
        address: "12 Admiralty Way",
        employees: 124,

    },
    {
        id: "entity-gh",
        name: "Omni Ghana Ltd",
        registrationNumber: "CS-903114",
        taxIdentifier: "TIN-GH-110",
        country: "Ghana",
        currency: "GHS",
        state: "Greater Accra",
        city: "Accra",
        address: "4 Ridge Road",
        employees: 42,

    },
    {
        id: "entity-ke",
        name: "Omni Kenya Ltd",
        registrationNumber: "PVT-KE-8827",
        country: "Kenya",
        currency: "KES",
        state: "Nairobi County",
        city: "Nairobi",
        address: "Westlands Business Park",
        employees: 0,
    },
];

export const sampleRoles: OrganizationRole[] = [
    {
        id: "role-hr-manager",
        name: "HR Manager",
        description: "Owns employee lifecycle, onboarding, and leave workflows.",
        memberCount: 3,
        isSystem: true,
    },
    {
        id: "role-payroll-officer",
        name: "Payroll Officer",
        description: "Runs payroll, approvals, and payroll exports.",
        memberCount: 2,
    },
    {
        id: "role-recruiter",
        name: "Recruiter",
        description: "Handles hiring pipelines, candidate stages, and offers.",
        memberCount: 4,
    },
];

export const sampleUsers: OrganizationUser[] = [
    {
        id: "user-grace",
        firstName: "Grace",
        lastName: "Johnson",
        email: "grace@omnicore.work",
        phoneNumber: "+234 803 111 0020",
        isEmployee: true,
        jobTitle: "HR Manager",
        entityIds: ["entity-ng", "entity-gh"],
        roleIds: ["role-hr-manager"],
        status: "Active",
    },
    {
        id: "user-john",
        firstName: "John",
        lastName: "Mensah",
        email: "john@omnicore.work",
        phoneNumber: "+233 244 222 190",
        isEmployee: false,
        entityIds: ["entity-gh"],
        roleIds: ["role-payroll-officer"],
        status: "Invited",
    },
    {
        id: "user-david",
        firstName: "David",
        lastName: "Otieno",
        email: "david@omnicore.work",
        phoneNumber: "+254 722 777 120",
        isEmployee: true,
        jobTitle: "Talent Partner",
        entityIds: ["entity-ke"],
        roleIds: ["role-recruiter"],
        status: "Active",
    },
];

export const permissionGroups: PermissionGroup[] = [
    {
        module: "Employees",
        permissions: [
            { id: "employee.view", label: "View Employee", description: "Open employee records and profiles." },
            { id: "employee.create", label: "Create Employee", description: "Create employee records inside an entity." },
            { id: "employee.edit", label: "Edit Employee", description: "Update employee information and lifecycle status." },
            { id: "employee.delete", label: "Delete Employee", description: "Archive or remove employee records." },
        ],
    },
    {
        module: "Departments",
        permissions: [
            { id: "department.view", label: "View Departments", description: "Browse department structures." },
            { id: "department.create", label: "Create Department", description: "Add new departments within an entity." },
            { id: "department.edit", label: "Edit Department", description: "Change department details or managers." },
            { id: "department.delete", label: "Delete Department", description: "Remove unused departments." },
        ],
    },
    {
        module: "Payroll",
        permissions: [
            { id: "payroll.generate", label: "Generate Payroll", description: "Prepare payroll runs for an entity." },
            { id: "payroll.approve", label: "Approve Payroll", description: "Approve payroll before disbursement." },
            { id: "payroll.export", label: "Export Payroll", description: "Download payroll reports and files." },
        ],
    },
    {
        module: "Recruitment",
        permissions: [
            { id: "recruitment.view", label: "View Recruitment", description: "Access jobs, candidates, and pipelines." },
            { id: "recruitment.manage", label: "Manage Recruitment", description: "Create jobs and move candidates through stages." },
        ],
    },
];

export const defaultRolePermissions: Record<string, string[]> = {
    "role-hr-manager": [
        "employee.view",
        "employee.create",
        "employee.edit",
        "department.view",
        "department.create",
        "department.edit",
        "recruitment.view",
    ],
    "role-payroll-officer": ["employee.view", "payroll.generate", "payroll.approve", "payroll.export"],
    "role-recruiter": ["employee.view", "recruitment.view", "recruitment.manage"],
};