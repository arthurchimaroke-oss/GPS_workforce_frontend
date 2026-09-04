import { useState } from 'react';
import { Plus, Trash2, Send, DollarSign, Loader2, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FlutterWaveButton } from 'flutterwave-react-v3';
import { cn } from '@/lib/utils';

interface EmployeeEntry {
  id: string;
  name: string;
  email: string;
  amount: string;
}

export function DisburseSalary() {
  const { toast } = useToast();
  const [payrollName, setPayrollName] = useState('');
  const [employees, setEmployees] = useState<EmployeeEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addEmployee = () => {
    setEmployees([...employees, {
      id: crypto.randomUUID(),
      name: '',
      email: '',
      amount: '',
    }]);
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const updateEmployee = (id: string, field: keyof EmployeeEntry, value: string) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const totalAmount = employees.reduce((sum, emp) => sum + (parseFloat(emp.amount) || 0), 0);

  const handlePaymentSuccess = (response: any) => {
    setIsProcessing(false);
    toast({ 
      title: 'Payroll run created!', 
      description: `Salaries allocated. Ref: ${response.tx_ref || 'Processing'}` 
    });
    setEmployees([]);
    setPayrollName('');
  };

  const handlePaymentError = (error: any) => {
    setIsProcessing(false);
    toast({ 
      title: 'Payment failed', 
      description: error.message || 'An error occurred during payment processing' 
    });
  };

  const handleCreatePayroll = () => {
    const valid = employees.filter(e => e.name && e.email && e.amount);
    if (valid.length === 0) {
      toast({ 
        title: 'No employees added', 
        description: 'Add at least one employee with valid details.' 
      });
      return;
    }

    setIsProcessing(true);
    // Payment will be processed via Flutterwave
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Disburse Salaries</h2>
          <p className="text-sm text-zinc-500">Allocate payments to employees via Flutterwave</p>
        </div>
      </div>

      {/* Total Amount Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Payroll Amount</p>
            <p className="text-3xl font-black text-zinc-900 mt-1">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2.5 bg-white border border-zinc-200 rounded-xl font-medium text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              {employees.length} Employees
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Name */}
      <div>
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Payroll Name</label>
        <input
          type="text"
          value={payrollName}
          onChange={(e) => setPayrollName(e.target.value)}
          placeholder="e.g., March 2026 Payroll"
          className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Employee List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Employees</label>
          <button
            onClick={addEmployee}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>

        {employees.map((emp, idx) => (
          <div key={emp.id} className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400">Employee #{idx + 1}</span>
              <button
                onClick={() => removeEmployee(emp.id)}
                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-zinc-400 hover:text-red-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={emp.name}
                onChange={(e) => updateEmployee(emp.id, 'name', e.target.value)}
                placeholder="Full name"
                className="px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-emerald-500 text-sm"
              />
              <input
                type="email"
                value={emp.email}
                onChange={(e) => updateEmployee(emp.id, 'email', e.target.value)}
                placeholder="Email address"
                className="px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-emerald-500 text-sm"
              />
              <div className="relative">
                <input
                  type="number"
                  value={emp.amount}
                  onChange={(e) => updateEmployee(emp.id, 'amount', e.target.value)}
                  placeholder="Salary amount"
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-emerald-500 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-medium">USD</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary & Submit */}
      {employees.length > 0 && (
        <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Payroll</p>
              <p className="text-2xl font-black text-zinc-900">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-zinc-500">Employees</p>
              <p className="text-2xl font-black text-zinc-900">{employees.length}</p>
            </div>
          </div>
          <FlutterWaveButton
            className={cn(
              'w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2',
              (isProcessing || employees.length === 0) && 'cursor-not-allowed'
            )}
            options={{
              tx_ref: `payroll-${Date.now()}`,
              amount: totalAmount,
              currency: 'USD',
              payment_options: 'card,banktransfer,mobilemoney',
              customer: {
                email: 'employer@company.com',
                phone_number: '',
                name: 'Payroll Employer',
              },
              customizations: {
                title: payrollName || 'Payroll Payment',
                description: `Payroll for ${employees.length} employees`,
                logo: '',
              },
            }}
            onCallback={handlePaymentSuccess}
            onClose={handlePaymentError}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Create Payroll & Pay ${totalAmount.toFixed(2)}
              </>
            )}
          </FlutterWaveButton>
        </div>
      )}
    </div>
  );
}
