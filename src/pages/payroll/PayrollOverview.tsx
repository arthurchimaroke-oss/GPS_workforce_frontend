import  { Fragment, useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Calendar,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Wallet,
  Settings2,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Users,
  X,
  Zap,
  Loader2,
  ShieldCheck,
  Lock,
  Briefcase,
  Star,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { SaaSPayrollDatabase } from '@/lib/saasPayrollDatabase';
import { useFunding } from '@/components/context/fundingContext';

// ─── Payroll history (unchanged) ───────────────────────────────────────────
const payrollHistory = [
  { id: 'PAY-8824', date: 'Mar 15, 2026', amount: '$67,400.00', employees: 124, status: 'Completed', method: 'Card' },
  { id: 'PAY-8823', date: 'Feb 15, 2026', amount: '$65,200.00', employees: 122, status: 'Completed', method: 'Bank' },
  { id: 'PAY-8822', date: 'Jan 15, 2026', amount: '$64,800.00', employees: 121, status: 'Completed', method: 'Card' },
  { id: 'PAY-8821', date: 'Dec 15, 2025', amount: '$68,100.00', employees: 125, status: 'Completed', method: 'Bank' },
];

// ─── Purpose-locked wallet definitions ─────────────────────────────────────
const WALLET_PURPOSES = [
  {
    id: 'salary',
    label: 'Salaries',
    desc: 'Employee wages & compensation only',
    Icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    activeBorder: 'border-blue-600',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'project',
    label: 'Projects',
    desc: 'Specific project budgets only',
    Icon: Briefcase,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    activeBorder: 'border-purple-600',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'ops',
    label: 'Operations',
    desc: 'Overhead & recurring costs only',
    Icon: Wrench,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    activeBorder: 'border-amber-600',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'bonus',
    label: 'Bonuses',
    desc: 'Performance & discretionary pay only',
    Icon: Star,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    activeBorder: 'border-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
];

// ─── Wallet balances type ───────────────────────────────────────────────────
type WalletBalances = Record<string, number>;

export default function EmployerPayroll() {
  const { toast } = useToast();

  // funding functions

  const { fundWallet } = useFunding()

  // ── Original state (all unchanged) ──────────────────────────────────────
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [disbursementStatus, setDisbursementStatus] = useState<Record<string, 'pending' | 'processing' | 'completed' | 'failed'>>({});
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [paymentTransactionId, setPaymentTransactionId] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // ── NEW: Funding flow state ──────────────────────────────────────────────
  const [fundingDetails, setFundingDetails] = useState(null);
  const [fundingStep, setFundingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [fundingAmount, setFundingAmount] = useState('');
  const [fundingNote, setFundingNote] = useState('');
  const [fundingProcessing, setFundingProcessing] = useState(false);
  const [fundingTxId, setFundingTxId] = useState('');
  const [walletBalances, setWalletBalances] = useState<WalletBalances>({
    salary: 14200,
    project: 5000,
    ops: 3800,
    bonus: 0,
  });
  const [fundingHistory, setFundingHistory] = useState([
    { purpose: 'salary', amount: 14200, date: 'Mar 15', note: 'Q1 payroll fund' },
    { purpose: 'project', amount: 5000, date: 'Feb 28', note: 'Website redesign' },
    { purpose: 'ops', amount: 3800, date: 'Feb 10', note: 'Office & subscriptions' },
  ]);

  // ── Original helpers (all unchanged) ────────────────────────────────────
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    toast({ title: message, description: type.charAt(0).toUpperCase() + type.slice(1) });
  };

  const [runEmployees, setRunEmployees] = useState([
    { id: 'EMP-001', name: 'Sarah Jenkins', role: 'HR Director', amount: 8500, bonus: 0, deduction: 0, status: 'Ready', bankAccount: '****4829', bankName: 'Chase Bank' },
    { id: 'EMP-002', name: 'Alex Rivera', role: 'Senior Engineer', amount: 7200, bonus: 0, deduction: 0, status: 'Ready', bankAccount: '****9102', bankName: 'Bank of America' },
    { id: 'EMP-003', name: 'Marcus Chen', role: 'Product Manager', amount: 6800, bonus: 0, deduction: 0, status: 'Ready', bankAccount: '****3371', bankName: 'Wells Fargo' },
    { id: 'EMP-004', name: 'Elena Rodriguez', role: 'UI Designer', amount: 5400, bonus: 0, deduction: 0, status: 'Ready', bankAccount: '****7745', bankName: 'Citibank' },
    { id: 'EMP-005', name: 'David Kim', role: 'Backend Engineer', amount: 7000, bonus: 0, deduction: 0, status: 'Ready', bankAccount: '****2288', bankName: 'US Bank' },
  ]);

  const handleRemoveEmployee = (id: string) => {
    setRunEmployees(runEmployees.filter(e => e.id !== id));
    showToast('Employee removed from this payroll run.', 'info');
  };

  const handleAdjustAmount = (id: string, newAmount: number) => {
    setRunEmployees(runEmployees.map(e => e.id === id ? { ...e, amount: newAmount } : e));
    showToast('Amount adjusted successfully.', 'success');
  };

  const handleAddBonus = (id: string) => {
    const bonus = prompt('Enter bonus amount:');
    if (bonus && !isNaN(parseFloat(bonus))) {
      setRunEmployees(runEmployees.map(e => e.id === id ? { ...e, bonus: parseFloat(bonus) } : e));
      showToast('Bonus added successfully.', 'success');
    }
  };

  const handleAddDeduction = (id: string) => {
    const deduction = prompt('Enter deduction amount:');
    if (deduction && !isNaN(parseFloat(deduction))) {
      setRunEmployees(runEmployees.map(e => e.id === id ? { ...e, deduction: parseFloat(deduction) } : e));
      showToast('Deduction added successfully.', 'success');
    }
  };

  const handleAddEmployee = () => {
    const name = prompt('Enter employee name:');
    if (!name) return;
    const role = prompt('Enter employee role:');
    if (!role) return;
    const amount = prompt('Enter salary amount:');
    if (!amount || isNaN(parseFloat(amount))) return;
    const newEmp = {
      id: `EMP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name, role, amount: parseFloat(amount), bonus: 0, deduction: 0, status: 'Ready',
      bankAccount: '****0000', bankName: 'Unknown Bank',
    };
    setRunEmployees([...runEmployees, newEmp]);
    showToast(`${name} added to the payroll run.`, 'success');
  };

  const totalGross = runEmployees.reduce((sum, e) => sum + e.amount + e.bonus - e.deduction, 0);

  const handleDownloadReceipt = () => {
    const receiptData = {
      transactionId: paymentTransactionId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      totalAmount: totalGross,
      processingFee: totalGross * 0.015,
      grandTotal: totalGross * 1.015,
      employees: runEmployees.map(emp => ({
        id: emp.id, name: emp.name, role: emp.role,
        bankAccount: emp.bankAccount, bankName: emp.bankName,
        amount: emp.amount + emp.bonus - emp.deduction,
        status: disbursementStatus[emp.id] || 'pending',
      })),
    };
    const receiptContent = `
PAYROLL PAYMENT RECEIPT
================================
Transaction ID: ${receiptData.transactionId}
Date: ${receiptData.date}
Status: COMPLETED
--------------------------------
EMPLOYEE DISBURSEMENTS:
--------------------------------
${receiptData.employees.map(emp => `
Employee ID: ${emp.id}
Name: ${emp.name}
Role: ${emp.role}
Bank: ${emp.bankName} ${emp.bankAccount}
Amount: $${emp.amount.toLocaleString()}
Status: ${emp.status.toUpperCase()}
`).join('\n--------------------------------\n')}
================================
SUMMARY:
================================
Total Gross: $${receiptData.totalAmount.toLocaleString()}
Processing Fee (1.5%): $${receiptData.processingFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}
Grand Total: $${receiptData.grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
================================
Generated by PayFlow HR System
    `.trim();
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payroll_Receipt_${paymentTransactionId}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Receipt downloaded!', description: 'Payroll receipt saved to your downloads folder.' });
  };

  const handlePaymentSuccess = (response: any) => {
    setIsProcessing(false);
    setPaymentSuccess(true);
    setPaymentTransactionId(response.tx_ref || `TX-${Date.now()}`);
    setStep(3);
    const initialStatus: Record<string, 'pending' | 'processing' | 'completed' | 'failed'> = {};
    runEmployees.forEach(emp => { initialStatus[emp.id] = 'pending'; });
    setDisbursementStatus(initialStatus);
    toast({ title: 'Payment successful!', description: `Transaction ID: ${response.tx_ref || 'Processing'}. Starting employee disbursements...` });
    setTimeout(() => { startDisbursement(); }, 2000);
  };

  const startDisbursement = async () => {
    setIsDisbursing(true);
    const employerId = 'EMP-COMPANY-001';
    const companyId = 'COMP-001';
    const disbursements = runEmployees.map(emp => {
      const dbEmployee = SaaSPayrollDatabase.getEmployee(emp.id);
      const currency = dbEmployee?.preferredCurrency || 'USD';
      const conversion = SaaSPayrollDatabase.convertCurrency(emp.amount + emp.bonus - emp.deduction, 'USD', currency);
      return {
        id: `DISB-${Date.now()}-${emp.id}`,
        employeeId: emp.id, employeeName: emp.name,
        employeeEmail: dbEmployee?.email || `${emp.name.toLowerCase().replace(' ', '.')}@company.com`,
        amount: emp.amount + emp.bonus - emp.deduction, bonus: emp.bonus, deduction: emp.deduction,
        netAmount: conversion.convertedAmount, currency, exchangeRate: conversion.rate,
        status: 'disbursed' as const, employerApprovalStatus: 'approved' as const,
        payrollRunId: paymentTransactionId, payrollDate: new Date().toISOString(),
      };
    });

    // for (const emp of runEmployees) {
    //   setDisbursementStatus(prev => ({ ...prev, [emp.id]: 'processing' }));
    //   await new Promise(resolve => setTimeout(resolve, 1500));
    //   const success = Math.random() > 0.05;
    //   const disbStatus = success ? 'claimed' : 'failed';
    //   setDisbursementStatus(prev => ({ ...prev, [emp.id]: disbStatus }));
    //   const disb = disbursements.find(d => d.employeeId === emp.id);
    //   if (disb) {
    //     SaaSPayrollDatabase.createNotification({
    //       id: `NOTIF-${Date.now()}-${emp.id}`, type: success ? 'claim_processed' : 'claim_failed',
    //       from: 'system', to: 'employee', fromId: 'system', toId: emp.id,
    //       payrollRunId: paymentTransactionId, disbursementId: disb.id,
    //       title: success ? 'Salary Disbursed Successfully!' : 'Salary Disbursement Failed',
    //       message: success
    //         ? `Your salary of ${disb.currency === 'USD' ? '$' : ''}${disb.netAmount.toLocaleString()} ${disb.currency} has been processed and is ready for claim.`
    //         : `There was an issue processing your salary payment. Please contact HR.`,
    //       amount: disb.netAmount, currency: disb.currency, status: 'unread', createdAt: new Date().toISOString(),
    //     });
    //     SaaSPayrollDatabase.createNotification({
    //       id: `NOTIF-EMP-${Date.now()}-${emp.id}`, type: success ? 'claim_processed' : 'claim_failed',
    //       from: 'system', to: 'employer', fromId: 'system', toId: employerId,
    //       payrollRunId: paymentTransactionId, disbursementId: disb.id,
    //       title: success ? `${emp.name} - Salary Disbursed` : `${emp.name} - Disbursement Failed`,
    //       message: success
    //         ? `${emp.name}'s salary of ${disb.currency} ${disb.netAmount.toLocaleString()} has been successfully disbursed.`
    //         : `Failed to disburse salary for ${emp.name}. Please review and retry.`,
    //       amount: disb.netAmount, currency: disb.currency, status: 'unread', createdAt: new Date().toISOString(),
    //     });
    //   }
    // }

    const payrollRun = {
      id: `RUN-${Date.now()}`, employerId, companyId, transactionId: paymentTransactionId,
      name: `Payroll ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      date: new Date().toISOString(), totalAmount: totalGross,
      processingFee: totalGross * 0.015, grandTotal: totalGross * 1.015,
      status: 'completed' as const, disbursements,
    };
    SaaSPayrollDatabase.savePayrollRun(payrollRun);
    setIsDisbursing(false);
    showToast('All disbursements completed and saved to SaaS database!', 'success');
  };

  const handlePaymentError = (error: any) => {
    setIsProcessing(false);
    toast({ title: 'Payment failed', description: error.message || 'An error occurred during payment processing' });
  };

  // ── NEW: Funding flow handlers ───────────────────────────────────────────
  const handleFundingConfirm = async () => {
    if (!selectedPurpose || !fundingAmount || parseFloat(fundingAmount) <= 0) return;
    setFundingProcessing(true);
    const funding = await fundWallet({ purpose: selectedPurpose, amount: parseFloat(fundingAmount) });
    console.log("The funding is " , funding);
     setFundingDetails(funding); // 
    setFundingStep(4);
    setTimeout(() => {
      const amt = parseFloat(fundingAmount);
      setWalletBalances(prev => ({ ...prev, [selectedPurpose]: (prev[selectedPurpose] || 0) + amt }));
      const txId = `TX-${Date.now()}`;
      setFundingTxId(txId);
      setFundingHistory(prev => [
        ...prev,
        { purpose: selectedPurpose, amount: amt, date: 'Today', note: fundingNote },
      ]);
      setFundingProcessing(false);
      setFundingStep(4);
      toast({ title: 'Wallet funded!', description: `$${amt.toLocaleString()} locked to ${WALLET_PURPOSES.find(p => p.id === selectedPurpose)?.label} wallet.` });
    }, 1400);
  };

  const resetFundingFlow = () => {
    setFundingStep(1);
    setSelectedPurpose(null);
    setFundingAmount('');
    setFundingNote('');
    setFundingTxId('');
  };

  const totalWalletBalance = Object.values(walletBalances).reduce((a, b) => a + b, 0);
  const fundingAmountNum = parseFloat(fundingAmount) || 0;
  const processingFee = fundingAmountNum * 0.015;
  const totalCharge = fundingAmountNum + processingFee;
  const activePurpose = WALLET_PURPOSES.find(p => p.id === selectedPurpose);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* ── Header (unchanged) ───────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
              Payroll Engine v2.4
            </span>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              Secure Payments
            </span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Next Cycle: June 30</span>
          </div>
          <h1 className="text-4xl font-black text-zinc-950 tracking-tighter">Payroll Center</h1>
          <p className="text-zinc-500 mt-1 font-medium">Automate global payments, tax compliance, and treasury management.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsConfiguring(true)} className="btn-secondary flex items-center gap-2">
            <Settings2 className="w-4 h-4" /> Configure
          </button>
          <button onClick={() => showToast('Exporting payroll reports...', 'info')} className="btn-primary flex items-center gap-2 shadow-xl shadow-zinc-200">
            <Download className="w-4 h-4" /> Export Reports
          </button>
        </div>
      </div>

      {/* ── Main Grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Configuration Modal (unchanged) */}
          <AnimatePresence>
            {isConfiguring && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4"
              >
                <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" onClick={() => setIsConfiguring(false)} />
                <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Payroll Configuration</h3>
                      <p className="text-sm text-zinc-500 font-medium">Modify, add, or remove employees for the upcoming run.</p>
                    </div>
                    <button onClick={() => setIsConfiguring(false)} className="p-2 hover:bg-zinc-200 rounded-xl transition-colors">
                      <X className="w-6 h-6 text-zinc-400" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8">
                    <div className="space-y-4">
                      {runEmployees.map((emp, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-zinc-100 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                              <Users className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-zinc-950">{emp.name}</p>
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{emp.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm font-black text-zinc-900">${(emp.amount + emp.bonus - emp.deduction).toLocaleString()}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <button onClick={() => { const a = prompt('Enter new amount:', emp.amount.toString()); if (a) handleAdjustAmount(emp.id, parseFloat(a)); }} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Adjust</button>
                                <span className="text-zinc-300">|</span>
                                <button onClick={() => handleAddBonus(emp.id)} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">+ Bonus</button>
                                <span className="text-zinc-300">|</span>
                                <button onClick={() => handleAddDeduction(emp.id)} className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">- Deduction</button>
                              </div>
                              {(emp.bonus > 0 || emp.deduction > 0) && (
                                <div className="flex items-center gap-2 mt-1 justify-end">
                                  {emp.bonus > 0 && <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">Bonus: +${emp.bonus}</span>}
                                  {emp.deduction > 0 && <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Deduction: -${emp.deduction}</span>}
                                </div>
                              )}
                            </div>
                            <button onClick={() => handleRemoveEmployee(emp.id)} className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleAddEmployee} className="w-full mt-6 p-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 font-black text-xs uppercase tracking-widest hover:border-zinc-950 hover:text-zinc-950 transition-all flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" /> Add Employee to Run
                    </button>
                  </div>
                  <div className="p-8 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Gross Configured</p>
                      <p className="text-2xl font-black text-zinc-950">${totalGross.toLocaleString()}</p>
                    </div>
                    <button onClick={() => setIsConfiguring(false)} className="px-8 py-4 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
                      Save & Close Configuration
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Stepper Card ───────────────────────────────────────────────── */}
          <div className="bg-white p-8 rounded-[32px] border border-zinc-200/60 shadow-premium">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-white">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-zinc-950 text-xl tracking-tight">Active Payroll Run</h3>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Cycle: June 2026</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-lg border border-amber-100 uppercase tracking-widest">Draft Mode</span>
            </div>

            {/* Progress Stepper (unchanged) */}
            <div className="relative mb-12 px-4">
              <div className="absolute top-5 left-0 w-full h-1 bg-zinc-100 rounded-full -translate-y-1/2" />
              <motion.div
                className="absolute top-5 left-0 h-1 bg-zinc-950 rounded-full -translate-y-1/2 z-10"
                initial={{ width: 0 }}
                animate={{ width: `${((step - 1) / 2) * 100}%` }}
                transition={{ duration: 0.8, ease: 'circOut' }}
              />
              <div className="relative z-20 flex justify-between">
                {[
                  { id: 1, label: 'Review', icon: Search },
                  { id: 2, label: 'Funding', icon: Wallet },
                  { id: 3, label: 'Execute', icon: CheckCircle2 },
                ].map(s => (
                  <div key={s.id} className="flex flex-col items-center gap-3">
                    <button
                      onClick={() => step > s.id && setStep(s.id)}
                      className={cn(
                        'w-10 h-10 rounded-2xl flex items-center justify-center border-4 transition-all duration-500',
                        step >= s.id ? 'bg-zinc-950 border-white text-white shadow-xl scale-110' : 'bg-white border-zinc-100 text-zinc-300'
                      )}
                    >
                      <s.icon className="w-4 h-4" />
                    </button>
                    <span className={cn('text-[10px] font-black uppercase tracking-widest', step >= s.id ? 'text-zinc-950' : 'text-zinc-300')}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Review (unchanged) ─────────────────────────────── */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryStat label="Total Gross" value={`$${totalGross.toLocaleString()}`} subtext="+2.4% vs May" />
                    <SummaryStat label="Employees" value={runEmployees.length.toString()} subtext="Active in run" />
                    <SummaryStat label="Tax Liability" value={`$${(totalGross * 0.19).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} subtext="Estimated" />
                  </div>
                  {!isDetailView ? (
                    <div className="space-y-6">
                      <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
                        <div className="flex items-center justify-between mb-4 px-2">
                          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Department Breakdown</h4>
                          <button onClick={() => setIsConfiguring(true)} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                            <Settings2 className="w-3 h-3" /> Configure Run
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <DeptItem name="Engineering" amount="$32,500" count={42} color="bg-blue-500" />
                          <DeptItem name="Design" amount="$12,400" count={18} color="bg-purple-500" />
                          <DeptItem name="Marketing" amount="$11,200" count={24} color="bg-pink-500" />
                          <DeptItem name="Operations" amount="$11,300" count={40} color="bg-emerald-500" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden">
                      <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                        <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Detailed Employee List</h4>
                        <button onClick={() => setIsDetailView(false)} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-zinc-950">Back to Summary</button>
                      </div>
                      <div className="divide-y divide-zinc-100">
                        {runEmployees.map(emp => (
                          <div key={emp.id} className="p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center font-black text-zinc-400 text-xs">
                                {emp.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm font-black text-zinc-900">{emp.name}</p>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{emp.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="text-sm font-black text-zinc-900">${(emp.amount + emp.bonus - emp.deduction).toLocaleString()}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <button onClick={() => { const a = prompt('Enter new amount:', emp.amount.toString()); if (a) handleAdjustAmount(emp.id, parseFloat(a)); }} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Adjust</button>
                                  <span className="text-zinc-300">|</span>
                                  <button onClick={() => handleAddBonus(emp.id)} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">+ Bonus</button>
                                  <span className="text-zinc-300">|</span>
                                  <button onClick={() => handleAddDeduction(emp.id)} className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">- Deduction</button>
                                </div>
                                {(emp.bonus > 0 || emp.deduction > 0) && (
                                  <div className="flex items-center gap-2 mt-1 justify-end">
                                    {emp.bonus > 0 && <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">Bonus: +${emp.bonus}</span>}
                                    {emp.deduction > 0 && <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Deduction: -${emp.deduction}</span>}
                                  </div>
                                )}
                              </div>
                              <button onClick={() => handleRemoveEmployee(emp.id)} className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={handleAddEmployee} className="w-full p-4 bg-zinc-50 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-950 hover:bg-zinc-100 transition-all border-t border-zinc-100">
                        + Add Employee to Run
                      </button>
                    </div>
                  )}
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => { setStep(2); setFundingStep(1); }}
                      className="px-8 py-4 bg-zinc-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2 group shadow-xl shadow-zinc-200"
                    >
                      Continue to Funding
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: NEW Purpose-Locked Funding Flow ─────────────────── */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">

                  {/* Mini stepper for funding sub-steps */}
                  <div className="flex items-center gap-0 mb-2">
                    {['Purpose', 'Amount', 'Confirm', 'Done'].map((label, i) => {
                      const n = i + 1;
                      const done = fundingStep > n;
                      const active = fundingStep === n;
                      return (
                        <Fragment key={n}>
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div className={cn(
                              'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all',
                              done ? 'bg-emerald-600 border-emerald-600 text-white' :
                                active ? 'bg-zinc-950 border-zinc-950 text-white' :
                                  'bg-white border-zinc-200 text-zinc-300'
                            )}>
                              {done ? '✓' : n}
                            </div>
                            <span className={cn('text-[9px] font-black uppercase tracking-widest', active ? 'text-zinc-950' : 'text-zinc-300')}>{label}</span>
                          </div>
                          {n < 4 && <div className={cn('h-0.5 flex-1 mb-4 transition-all', done ? 'bg-emerald-600' : 'bg-zinc-100')} />}
                        </Fragment>
                      );
                    })}
                  </div>

                  {/* ── Funding Sub-step 1: Choose Purpose ─────────────────── */}
                  {fundingStep === 1 && (
                    <AnimatePresence mode="wait">
                      <motion.div key="fs1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                        {/* Wallet balances overview */}
                        <div className="grid grid-cols-2 gap-3">
                          {WALLET_PURPOSES.map(p => {
                            const bal = walletBalances[p.id] || 0;
                            const pct = totalWalletBalance > 0 ? Math.round((bal / totalWalletBalance) * 100) : 0;
                            return (
                              <div key={p.id} className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', p.bg)}>
                                    <p.Icon className={cn('w-3.5 h-3.5', p.color)} />
                                  </div>
                                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{p.label}</span>
                                </div>
                                <p className="text-lg font-black text-zinc-950">${bal.toLocaleString()}</p>
                                <div className="mt-2 h-1 bg-zinc-200 rounded-full overflow-hidden">
                                  <div className={cn('h-full rounded-full', p.color.replace('text-', 'bg-'))} style={{ width: `${pct}%` }} />
                                </div>
                                <p className="text-[9px] text-zinc-400 font-bold mt-1">{pct}% of total</p>
                              </div>
                            );
                          })}
                        </div>

                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Select purpose — funds will be locked exclusively to this wallet</p>

                        <div className="grid grid-cols-1 gap-3">
                          {WALLET_PURPOSES.map(p => (
                            <button
                              key={p.id}
                              onClick={() => setSelectedPurpose(p.id)}
                              className={cn(
                                'flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all',
                                selectedPurpose === p.id
                                  ? `${p.activeBorder} ${p.bg}`
                                  : 'border-zinc-100 bg-white hover:border-zinc-200 hover:bg-zinc-50'
                              )}
                            >
                              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', p.bg)}>
                                <p.Icon className={cn('w-5 h-5', p.color)} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-black text-zinc-950">{p.label}</p>
                                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{p.desc}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Balance</p>
                                <p className="text-sm font-black text-zinc-900">${(walletBalances[p.id] || 0).toLocaleString()}</p>
                              </div>
                              {selectedPurpose === p.id && (
                                <CheckCircle2 className={cn('w-5 h-5 shrink-0', p.color)} />
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Lock notice */}
                        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                          <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-blue-800 font-medium leading-relaxed">
                            Funds deposited into a wallet are <strong>locked to that purpose only</strong>. A salary deposit cannot be used for projects, and a project deposit cannot be used for salaries — this is enforced at the disbursement level.
                          </p>
                        </div>

                        <div className="flex justify-between pt-2">
                          <button onClick={() => setStep(1)} className="px-5 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">
                            ← Back to Review
                          </button>
                          <button
                            onClick={() => selectedPurpose && setFundingStep(2)}
                            disabled={!selectedPurpose}
                            className="px-6 py-3 bg-zinc-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            Next → Set Amount
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* ── Funding Sub-step 2: Enter Amount ───────────────────── */}
                  {fundingStep === 2 && activePurpose && (
                    <AnimatePresence mode="wait">
                      <motion.div key="fs2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
                        {/* Active wallet badge */}
                        <div className={cn('flex items-center gap-3 p-4 rounded-2xl border', activePurpose.bg, activePurpose.border)}>
                          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', activePurpose.bg)}>
                            <activePurpose.Icon className={cn('w-5 h-5', activePurpose.color)} />
                          </div>
                          <div className="flex-1">
                            <p className={cn('text-sm font-black', activePurpose.color)}>{activePurpose.label} wallet</p>
                            <p className="text-[11px] text-zinc-500 font-medium">Current balance: ${(walletBalances[activePurpose.id] || 0).toLocaleString()}</p>
                          </div>
                          <button onClick={() => setFundingStep(1)} className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-700">Change</button>
                        </div>

                        {/* Amount input */}
                        <div>
                          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Amount to fund</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-zinc-400">$</span>
                            <input
                              type="number"
                              min="1"
                              step="0.01"
                              placeholder="0.00"
                              value={fundingAmount}
                              onChange={e => setFundingAmount(e.target.value)}
                              className="w-full pl-10 pr-4 py-4 text-2xl font-black text-zinc-950 border-2 border-zinc-200 rounded-2xl focus:border-zinc-950 focus:outline-none transition-colors bg-white"
                            />
                          </div>
                          {fundingAmountNum > 0 && (
                            <p className="text-xs text-zinc-500 font-medium mt-2">
                              New {activePurpose.label} balance after funding:{' '}
                              <strong className="text-zinc-900">
                                ${((walletBalances[activePurpose.id] || 0) + fundingAmountNum).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </strong>
                            </p>
                          )}
                        </div>

                        {/* Note input */}
                        <div>
                          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Note (optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. April payroll fund, Q2 website redesign…"
                            value={fundingNote}
                            onChange={e => setFundingNote(e.target.value)}
                            className="w-full px-4 py-3 text-sm text-zinc-950 border border-zinc-200 rounded-2xl focus:border-zinc-950 focus:outline-none transition-colors bg-white"
                          />
                        </div>

                        {/* Quick amount chips */}
                        <div>
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Quick amounts</p>
                          <div className="flex flex-wrap gap-2">
                            {[5000, 10000, 25000, 50000, 100000].map(amt => (
                              <button key={amt} onClick={() => setFundingAmount(amt.toString())} className="px-3 py-1.5 border border-zinc-200 rounded-lg text-[11px] font-black text-zinc-600 hover:border-zinc-950 hover:text-zinc-950 transition-all">
                                ${amt.toLocaleString()}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between pt-2">
                          <button onClick={() => setFundingStep(1)} className="px-5 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">← Back</button>
                          <button
                            onClick={() => fundingAmountNum > 0 && setFundingStep(3)}
                            disabled={fundingAmountNum <= 0}
                            className="px-6 py-3 bg-zinc-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            Next → Review Payment
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* ── Funding Sub-step 3: Confirm & Pay ──────────────────── */}
                  {fundingStep === 3 && activePurpose && (
                    <AnimatePresence mode="wait">
                      <motion.div key="fs3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
                        <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-5 space-y-3">
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Payment summary</p>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-zinc-500 font-medium">Destination wallet</span>
                            <span className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black border', activePurpose.badge)}>
                              <activePurpose.Icon className="w-3 h-3" />
                              {activePurpose.label}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-zinc-500 font-medium">Deposit amount</span>
                            <span className="text-sm font-black text-zinc-950">${fundingAmountNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-zinc-500 font-medium">Processing fee (1.5%)</span>
                            <span className="text-sm font-black text-zinc-950">${processingFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                          </div>

                          {fundingNote && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-zinc-500 font-medium">Note</span>
                              <span className="text-sm text-zinc-500 italic">{fundingNote}</span>
                            </div>
                          )}

                          <div className="pt-3 border-t border-zinc-200 flex justify-between items-center">
                            <span className="text-sm font-black text-zinc-950">Total charge</span>
                            <span className="text-2xl font-black text-zinc-950">${totalCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* Payment method selector */}
                        <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-5">
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Pay with</p>
                          <div className="flex gap-2 flex-wrap">
                            {['💳 Card', '🏦 Bank Transfer', '📱 Mobile Money'].map(m => (
                              <button key={m} className="px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:border-zinc-950 transition-all">{m}</button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                            <span className="text-[11px] text-zinc-400 font-medium">
                              Test card: <code className="bg-zinc-200 px-1.5 py-0.5 rounded font-mono text-[10px]">4242 4242 4242 4242</code>
                            </span>
                          </div>
                        </div>

                        {/* Lock reminder */}
                        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                          <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-800 font-medium leading-relaxed">
                            <strong>${fundingAmountNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong> will be locked exclusively to your <strong>{activePurpose.label}</strong> wallet and cannot be used for any other purpose.
                          </p>
                        </div>

                        <div className="flex justify-between pt-2">
                          <button onClick={() => setFundingStep(2)} className="px-5 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">← Back</button>
                          <button
                            onClick={handleFundingConfirm}
                            disabled={fundingProcessing}
                            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-200 disabled:opacity-60"
                          >
                            {fundingProcessing ? (
                              <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                            ) : (
                              <><ShieldCheck className="w-4 h-4" /> Confirm & Fund ${totalCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}</>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* ── Funding Sub-step 4: Success ─────────────────────────── */}
                  {/* ── Funding Sub-step 4: Transfer Instructions ─────────────────────────── */}
                  {fundingStep === 4 && activePurpose && fundingDetails && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="fs4-transfer"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 py-4"
                      >
                        {/* Header */}
                        <div className="text-center">
                          <h3 className="text-2xl font-black text-zinc-950 tracking-tight">
                            Complete Your Payment
                          </h3>
                          <p className="text-zinc-500 mt-2 text-sm">
                            Transfer the amount below to fund your{" "}
                            <strong>{activePurpose.label}</strong> wallet
                          </p>
                        </div>

                        {/* Amount */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
                          <p className="text-xs text-emerald-600 font-bold uppercase">
                            Amount to Send
                          </p>
                          <p className="text-3xl font-black text-emerald-700 mt-1">
                            ₦{parseFloat(fundingAmount).toLocaleString()}
                          </p>
                        </div>

                        {/* Bank Details */}
                        <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                            Transfer Details
                          </p>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-zinc-500">Bank</span>
                            <span className="font-bold text-zinc-900">
                              {fundingDetails.bank_name}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-zinc-500">Account Number</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-zinc-900">
                                {fundingDetails.account_number}
                              </span>
                              <button
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    fundingDetails.account_number
                                  )
                                }
                                className="text-xs text-emerald-600 font-bold"
                              >
                                Copy
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-zinc-500">Account Name</span>
                            <span className="font-bold text-zinc-900">
                              {fundingDetails.account_name}
                            </span>
                          </div>
                        </div>

                        {/* Reference */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                          <p className="text-xs text-amber-700 font-bold uppercase">
                            Important
                          </p>
                          <p className="text-sm text-amber-800 mt-1">
                            Use this reference when making the transfer:
                          </p>

                          <div className="flex items-center justify-between mt-2 bg-white px-3 py-2 rounded-lg border">
                            <span className="font-mono text-sm font-bold text-zinc-900">
                              {fundingDetails.reference}
                            </span>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  fundingDetails.reference
                                )
                              }
                              className="text-xs text-amber-600 font-bold"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        {/* Waiting Notice */}
                        <div className="text-center text-sm text-zinc-500">
                          Once payment is received, your wallet will be credited automatically.
                        </div>

                        {/* Actions
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={resetFundingFlow}
                            className="px-6 py-3 border border-zinc-200 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 transition-all"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => setFundingStep(5)} // optional future step
                            className="px-6 py-3 bg-zinc-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
                          >
                            I’ve Sent Payment
                          </button>
                        </div> */}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </motion.div>
              )}

              {/* ── STEP 3: Execute (unchanged) ───────────────────────────── */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-8">
                  <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto relative">
                    <CheckCircle2 className="w-12 h-12" />
                    <motion.div className="absolute inset-0 rounded-full border-4 border-emerald-500" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-zinc-950 tracking-tight">Payment Complete!</h3>
                    <p className="text-zinc-500 mt-2 max-w-sm mx-auto font-medium">Your payroll payment has been processed successfully. Disbursing funds to employees...</p>
                    <div className="mt-6 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 inline-flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg border border-zinc-200 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Transaction Reference</p>
                        <p className="text-xs font-mono font-bold text-zinc-600">{paymentTransactionId}</p>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto space-y-4 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Employee Disbursements</h4>
                      {isDisbursing && <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />}
                    </div>
                    <div className="space-y-3">
                      {runEmployees.map(emp => {
                        const status = disbursementStatus[emp.id] || 'pending';
                        return (
                          <div key={emp.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-zinc-200">
                            <div className="flex items-center gap-4">
                              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center',
                                status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                                  status === 'processing' ? 'bg-blue-50 text-blue-600' :
                                    status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-zinc-100 text-zinc-400'
                              )}>
                                {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                                  status === 'processing' ? <Loader2 className="w-5 h-5 animate-spin" /> :
                                    status === 'failed' ? <AlertCircle className="w-5 h-5" /> :
                                      <Clock className="w-5 h-5" />}
                              </div>
                              <div>
                                <p className="text-sm font-black text-zinc-900">{emp.name}</p>
                                <p className="text-[10px] text-zinc-400 font-bold">{emp.bankName} {emp.bankAccount}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-black text-zinc-900">${(emp.amount + emp.bonus - emp.deduction).toLocaleString()}</p>
                              <p className={cn('text-[9px] font-black uppercase tracking-widest',
                                status === 'completed' ? 'text-emerald-600' :
                                  status === 'processing' ? 'text-blue-600' :
                                    status === 'failed' ? 'text-red-600' : 'text-zinc-400'
                              )}>
                                {status === 'completed' ? 'Sent' : status === 'processing' ? 'Processing...' : status === 'failed' ? 'Failed' : 'Pending'}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button onClick={handleDownloadReceipt} className="px-8 py-4 bg-zinc-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" /> Download Receipt
                    </button>
                    <button onClick={() => { setStep(1); setPaymentSuccess(false); setDisbursementStatus({}); }} className="px-8 py-4 bg-white border border-zinc-200 text-zinc-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">
                      New Payroll Run
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History Table (unchanged) */}
          <div className="bg-white rounded-[32px] border border-zinc-200/60 shadow-premium overflow-hidden">
            <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="font-black text-zinc-950 text-xl tracking-tight">Payroll History</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Past 4 cycles</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showToast('Opening history filters...', 'info')} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors">
                  <Filter className="w-5 h-5 text-zinc-400" />
                </button>
                <button onClick={() => showToast('Searching payroll history...', 'info')} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors">
                  <Search className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50 border-b border-zinc-100">
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Cycle ID</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Talent</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {payrollHistory.map(row => (
                    <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors group cursor-pointer">
                      <td className="px-8 py-5"><span className="text-sm font-black text-zinc-950">{row.id}</span></td>
                      <td className="px-8 py-5"><span className="text-sm text-zinc-500 font-medium">{row.date}</span></td>
                      <td className="px-8 py-5"><span className="text-sm font-black text-zinc-950">{row.amount}</span></td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3 text-zinc-400" />
                          <span className="text-sm text-zinc-500 font-medium">{row.employees}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">{row.status}</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => showToast(`Downloading receipt for cycle ${row.id}...`, 'success')} className="p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-zinc-50/50 flex items-center justify-center">
              <button onClick={() => showToast('Loading full payroll history...', 'info')} className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-950 transition-colors flex items-center gap-2">
                View Full History <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Summary (unchanged) */}
        <div className="space-y-8">
          <div className="bg-zinc-950 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h3 className="font-black text-xl tracking-tight mb-6 relative z-10">Cycle Summary</h3>
            <div className="space-y-4 relative z-10">
              <SummaryRow label="Gross Salary" value={`$${totalGross.toLocaleString()}`} />
              <SummaryRow label="Employer Taxes" value={`$${(totalGross * 0.077).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
              <SummaryRow label="Benefits" value={`$${(totalGross * 0.031).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
              <SummaryRow label="Platform Fee" value="$150.00" />
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Cost</span>
                  <span className="text-2xl font-black text-emerald-400">${(totalGross * 1.108 + 150).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Balances Widget (NEW — added to right column) */}
          <div className="bg-white p-8 rounded-[32px] border border-zinc-200/60 shadow-premium">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h4 className="font-black text-lg text-zinc-950 tracking-tight">Wallet Balances</h4>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">Purpose-locked funds</p>
              </div>
              <button onClick={() => { setStep(2); setFundingStep(1); }} className="px-3 py-2 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-1.5">
                <Wallet className="w-3 h-3" /> Fund
              </button>
            </div>
            <div className="space-y-3">
              {WALLET_PURPOSES.map(p => {
                const bal = walletBalances[p.id] || 0;
                const pct = totalWalletBalance > 0 ? Math.round((bal / totalWalletBalance) * 100) : 0;
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', p.bg)}>
                      <p.Icon className={cn('w-4 h-4', p.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-black text-zinc-700">{p.label}</span>
                        <span className="text-xs font-black text-zinc-950">${bal.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: 'circOut' }}
                          className={cn('h-full rounded-full', p.color.replace('text-', 'bg-'))}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-zinc-100 flex justify-between">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total locked</span>
                <span className="text-sm font-black text-zinc-950">${totalWalletBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-zinc-200/60 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12% EFFICIENCY</span>
            </div>
            <h4 className="font-black text-lg text-zinc-950 tracking-tight">Payroll Efficiency</h4>
            <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">
              Your automated payment processing saved <span className="text-zinc-950 font-black">$1,240</span> in transaction fees this month.
            </p>
            <div className="mt-6 pt-6 border-t border-zinc-100">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                <span>Automation Level</span>
                <span className="text-zinc-950">85%</span>
              </div>
              <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, ease: 'circOut' }} className="h-full bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-8 rounded-[32px] border border-amber-100 group">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <AlertCircle className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-black text-sm text-amber-900">Payment Reminder</h4>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed font-medium">
                  Ensure your payment method has sufficient balance to cover <span className="font-black">${totalGross.toLocaleString()}</span> for the current cycle's payroll.
                </p>
                <button onClick={() => showToast('Redirecting to payment settings...', 'info')} className="mt-4 text-[10px] font-black text-amber-900 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Update payment method <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components (all unchanged) ─────────────────────────────────────────
function SummaryStat({ label, value, subtext }: any) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/30">
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-black text-zinc-950 tracking-tighter">{value}</h4>
      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mt-1">{subtext}</p>
    </div>
  );
}

function DeptItem({ name, amount, count, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-zinc-100 rounded-2xl hover:border-zinc-200 transition-all group">
      <div className="flex items-center gap-3">
        <div className={cn('w-1.5 h-10 rounded-full', color)} />
        <div>
          <p className="text-sm font-black text-zinc-950">{name}</p>
          <p className="text-[10px] text-zinc-500 font-medium">{count} Talent</p>
        </div>
      </div>
      <p className="text-sm font-black text-zinc-950">{amount}</p>
    </div>
  );
}

function SummaryRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-zinc-400 font-medium">{label}</span>
      <span className="font-black text-zinc-100">{value}</span>
    </div>
  );
}