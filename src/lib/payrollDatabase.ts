// Mock Database for Payroll Disbursements
// This simulates a backend database storing payroll runs and employee claims

export interface DisbursementRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  amount: number;
  status: 'pending' | 'claimed' | 'failed';
  payrollRunId: string;
  payrollDate: string;
  claimedAt?: string;
  transactionId?: string;
}

export interface PayrollRun {
  id: string;
  transactionId: string;
  date: string;
  totalAmount: number;
  processingFee: number;
  grandTotal: number;
  status: 'completed' | 'failed';
  disbursements: DisbursementRecord[];
}

// Mock database stored in localStorage
const STORAGE_KEY = 'payflow_payroll_database';

export const PayrollDatabase = {
  // Get all payroll runs
  getAllPayrollRuns(): PayrollRun[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  },

  // Save a complete payroll run with disbursements
  savePayrollRun(payrollRun: PayrollRun): void {
    const runs = this.getAllPayrollRuns();
    runs.push(payrollRun);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
  },

  // Get pending disbursements for a specific employee
  getEmployeePendingClaims(employeeId: string): DisbursementRecord[] {
    const runs = this.getAllPayrollRuns();
    return runs
      .flatMap(run => run.disbursements)
      .filter(d => d.employeeId === employeeId && d.status === 'pending');
  },

  // Get all claims for an employee (including claimed)
  getEmployeeAllClaims(employeeId: string): DisbursementRecord[] {
    const runs = this.getAllPayrollRuns();
    return runs
      .flatMap(run => run.disbursements)
      .filter(d => d.employeeId === employeeId);
  },

  // Mark a disbursement as claimed
  markAsClaimed(disbursementId: string, transactionId: string): boolean {
    const runs = this.getAllPayrollRuns();
    for (const run of runs) {
      const disbursement = run.disbursements.find(d => d.id === disbursementId);
      if (disbursement) {
        disbursement.status = 'claimed';
        disbursement.claimedAt = new Date().toISOString();
        disbursement.transactionId = transactionId;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
        return true;
      }
    }
    return false;
  },

  // Clear all data (for testing)
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};
