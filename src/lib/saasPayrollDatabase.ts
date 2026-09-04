// SaaS Payroll Database - Multi-tenant Architecture
// SaaS Owner → Employers (Sub-accounts) → Employees

export interface SaaSOrganization {
  id: string;
  name: string; // "PayFlow HR"
  masterBalance: number;
  totalEmployers: number;
  totalEmployees: number;
  totalProcessed: number;
}

export interface EmployerAccount {
  id: string;
  companyId: string;
  companyName: string;
  employerEmail: string;
  balance: number; // Available funds
  totalSpent: number;
  totalEmployees: number;
  currency: string; // Base currency (USD, EUR, GBP, NGN, etc.)
  status: 'active' | 'suspended' | 'trial';
  createdAt: string;
}

export interface EmployeeAccount {
  id: string;
  companyId: string;
  employerId: string;
  name: string;
  email: string;
  location: string;
  preferredCurrency: string; // Employee's choice
  claimFrequency: 'daily' | 'weekly' | 'monthly';
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    country: string;
  };
  totalEarned: number;
  totalClaimed: number;
  pendingAmount: number;
}

export interface PayrollRun {
  id: string;
  employerId: string;
  companyId: string;
  transactionId: string; // SaaS master transaction
  name: string;
  date: string;
  totalAmount: number;
  processingFee: number;
  grandTotal: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  disbursements: DisbursementRecord[];
}

export interface DisbursementRecord {
  id: string;
  payrollRunId: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  amount: number;
  bonus: number;
  deduction: number;
  netAmount: number;
  currency: string; // Employee's preferred currency
  exchangeRate?: number; // If conversion needed
  status: 'pending' | 'processing' | 'disbursed' | 'claimed' | 'failed';
  employerApprovalStatus: 'pending' | 'approved' | 'rejected';
  claimedAt?: string;
  transactionId?: string;
}

export interface TransactionNotification {
  id: string;
  type: 'claim_request' | 'claim_approved' | 'claim_rejected' | 'claim_processed' | 'claim_failed' | 'balance_update';
  from: 'employer' | 'employee' | 'system';
  to: 'employer' | 'employee';
  fromId: string;
  toId: string;
  payrollRunId?: string;
  disbursementId?: string;
  title: string;
  message: string;
  amount?: number;
  currency?: string;
  status: 'unread' | 'read';
  createdAt: string;
  employerResponse?: string;
  employeeResponse?: string;
}

// Mock Database stored in localStorage
const STORAGE_KEYS = {
  SAAS_ORG: 'payflow_saas_organization',
  EMPLOYERS: 'payflow_employers',
  EMPLOYEES: 'payflow_employees',
  PAYROLL_RUNS: 'payflow_payroll_runs',
  NOTIFICATIONS: 'payflow_notifications',
};

// Initialize with mock data
function initializeMockData() {
  if (!localStorage.getItem(STORAGE_KEYS.SAAS_ORG)) {
    localStorage.setItem(STORAGE_KEYS.SAAS_ORG, JSON.stringify({
      id: 'saas-001',
      name: 'PayFlow HR',
      masterBalance: 2450000,
      totalEmployers: 12,
      totalEmployees: 1240,
      totalProcessed: 8750000,
    }));
  }

  if (!localStorage.getItem(STORAGE_KEYS.EMPLOYERS)) {
    localStorage.setItem(STORAGE_KEYS.EMPLOYERS, JSON.stringify([
      {
        id: 'EMP-COMPANY-001',
        companyId: 'COMP-001',
        companyName: 'TechCorp Inc.',
        employerEmail: 'employer@techcorp.com',
        balance: 125000,
        totalSpent: 450000,
        totalEmployees: 124,
        currency: 'USD',
        status: 'active',
        createdAt: '2025-01-15T00:00:00Z',
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify([
      {
        id: 'EMP-001',
        companyId: 'COMP-001',
        employerId: 'EMP-COMPANY-001',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@techcorp.com',
        location: 'United States',
        preferredCurrency: 'USD',
        claimFrequency: 'monthly',
        bankDetails: {
          bankName: 'Chase Bank',
          accountNumber: '****4829',
          accountName: 'Sarah Jenkins',
          country: 'US',
        },
        totalEarned: 85000,
        totalClaimed: 76500,
        pendingAmount: 8500,
      },
      {
        id: 'EMP-002',
        companyId: 'COMP-001',
        employerId: 'EMP-COMPANY-001',
        name: 'Alex Rivera',
        email: 'alex.rivera@techcorp.com',
        location: 'Mexico',
        preferredCurrency: 'MXN',
        claimFrequency: 'weekly',
        bankDetails: {
          bankName: 'BBVA México',
          accountNumber: '****7821',
          accountName: 'Alex Rivera',
          country: 'MX',
        },
        totalEarned: 72000,
        totalClaimed: 64800,
        pendingAmount: 7200,
      },
      {
        id: 'EMP-003',
        companyId: 'COMP-001',
        employerId: 'EMP-COMPANY-001',
        name: 'Priya Sharma',
        email: 'priya.sharma@techcorp.com',
        location: 'India',
        preferredCurrency: 'INR',
        claimFrequency: 'monthly',
        bankDetails: {
          bankName: 'HDFC Bank',
          accountNumber: '****3456',
          accountName: 'Priya Sharma',
          country: 'IN',
        },
        totalEarned: 68000,
        totalClaimed: 61200,
        pendingAmount: 6800,
      },
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PAYROLL_RUNS)) {
    localStorage.setItem(STORAGE_KEYS.PAYROLL_RUNS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
  }
}

// Initialize on load
initializeMockData();

export const SaaSPayrollDatabase = {
  // SaaS Organization
  getOrganization(): SaaSOrganization {
    const data = localStorage.getItem(STORAGE_KEYS.SAAS_ORG);
    return data ? JSON.parse(data) : {} as SaaSOrganization;
  },

  updateOrganizationBalance(amount: number): void {
    const org = this.getOrganization();
    org.masterBalance += amount;
    org.totalProcessed += amount;
    localStorage.setItem(STORAGE_KEYS.SAAS_ORG, JSON.stringify(org));
  },

  // Employers
  getAllEmployers(): EmployerAccount[] {
    const data = localStorage.getItem(STORAGE_KEYS.EMPLOYERS);
    return data ? JSON.parse(data) : [];
  },

  getEmployer(employerId: string): EmployerAccount | undefined {
    const employers = this.getAllEmployers();
    return employers.find(e => e.id === employerId);
  },

  updateEmployerBalance(employerId: string, amount: number): void {
    const employers = this.getAllEmployers();
    const employer = employers.find(e => e.id === employerId);
    if (employer) {
      employer.balance += amount;
      localStorage.setItem(STORAGE_KEYS.EMPLOYERS, JSON.stringify(employers));
    }
  },

  // Employees
  getAllEmployees(): EmployeeAccount[] {
    const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    return data ? JSON.parse(data) : [];
  },

  getEmployee(employeeId: string): EmployeeAccount | undefined {
    const employees = this.getAllEmployees();
    return employees.find(e => e.id === employeeId);
  },

  getCompanyEmployees(companyId: string): EmployeeAccount[] {
    const employees = this.getAllEmployees();
    return employees.filter(e => e.companyId === companyId);
  },

  // Payroll Runs
  getAllPayrollRuns(): PayrollRun[] {
    const data = localStorage.getItem(STORAGE_KEYS.PAYROLL_RUNS);
    return data ? JSON.parse(data) : [];
  },

  getEmployerPayrollRuns(employerId: string): PayrollRun[] {
    const runs = this.getAllPayrollRuns();
    return runs.filter(r => r.employerId === employerId);
  },

  savePayrollRun(payrollRun: PayrollRun): void {
    const runs = this.getAllPayrollRuns();
    runs.push(payrollRun);
    localStorage.setItem(STORAGE_KEYS.PAYROLL_RUNS, JSON.stringify(runs));
    
    // Update employer balance
    this.updateEmployerBalance(payrollRun.employerId, -payrollRun.grandTotal);
    
    // Update SaaS master balance
    this.updateOrganizationBalance(payrollRun.grandTotal);
  },

  // Employee Claims
  getEmployeePendingClaims(employeeId: string): DisbursementRecord[] {
    const runs = this.getAllPayrollRuns();
    return runs
      .flatMap(run => run.disbursements)
      .filter(d => d.employeeId === employeeId && d.status === 'disbursed');
  },

  getEmployeeAllClaims(employeeId: string): DisbursementRecord[] {
    const runs = this.getAllPayrollRuns();
    return runs
      .flatMap(run => run.disbursements)
      .filter(d => d.employeeId === employeeId);
  },

  updateDisbursementStatus(disbursementId: string, status: DisbursementRecord['status']): void {
    const runs = this.getAllPayrollRuns();
    for (const run of runs) {
      const disbursement = run.disbursements.find(d => d.id === disbursementId);
      if (disbursement) {
        disbursement.status = status;
        if (status === 'claimed') {
          disbursement.claimedAt = new Date().toISOString();
        }
        localStorage.setItem(STORAGE_KEYS.PAYROLL_RUNS, JSON.stringify(runs));
        break;
      }
    }
  },

  // Notifications
  getAllNotifications(): TransactionNotification[] {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  },

  getUserNotifications(userId: string, userType: 'employer' | 'employee'): TransactionNotification[] {
    const notifications = this.getAllNotifications();
    return notifications
      .filter(n => 
        (userType === 'employer' && n.to === 'employer' && n.toId === userId) ||
        (userType === 'employee' && n.to === 'employee' && n.toId === userId)
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createNotification(notification: TransactionNotification): void {
    const notifications = this.getAllNotifications();
    notifications.push(notification);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },

  markNotificationAsRead(notificationId: string): void {
    const notifications = this.getAllNotifications();
    const notif = notifications.find(n => n.id === notificationId);
    if (notif) {
      notif.status = 'read';
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  },

  // Currency Conversion (mock rates)
  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): { convertedAmount: number, rate: number } {
    const rates: Record<string, Record<string, number>> = {
      USD: { USD: 1, EUR: 0.92, GBP: 0.79, NGN: 1550, INR: 83.5, MXN: 17.2 },
      EUR: { USD: 1.09, EUR: 1, GBP: 0.86, NGN: 1685, INR: 90.8, MXN: 18.7 },
      GBP: { USD: 1.27, EUR: 1.16, GBP: 1, NGN: 1962, INR: 105.6, MXN: 21.8 },
      NGN: { USD: 0.000645, EUR: 0.000594, GBP: 0.00051, NGN: 1, INR: 0.0539, MXN: 0.0111 },
      INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, NGN: 18.55, INR: 1, MXN: 0.206 },
      MXN: { USD: 0.058, EUR: 0.053, GBP: 0.046, NGN: 90.1, INR: 4.85, MXN: 1 },
    };

    const rate = rates[fromCurrency]?.[toCurrency] || 1;
    return {
      convertedAmount: amount * rate,
      rate,
    };
  },

  // Clear all data (for testing)
  clear(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    initializeMockData();
  }
};
