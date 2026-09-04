import React from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle,
  ChevronRight,
  Plus,
  ArrowRight,
  History,
  Globe,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PayrollDatabase } from '@/lib/payrollDatabase';

const EmployeeDashboard = () => {
  // Mock employee ID
  const employeeId = 'EMP-001';
  
  // Fetch claims from database
  const pendingClaims = PayrollDatabase.getEmployeePendingClaims(employeeId);
  const totalPending = pendingClaims.reduce((sum, claim) => sum + claim.amount, 0);
  
  const stats = [
    { label: 'Available Balance', value: '$4,250.00', change: '+12.5%', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Next Payday', value: 'Mar 25, 2026', change: 'In 6 days', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Claims', value: `$${totalPending.toLocaleString()}`, change: `${pendingClaims.length} item(s)`, icon: History, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentTransactions = [
    { id: 1, type: 'Salary', amount: '+$3,500.00', date: 'Feb 25, 2026', status: 'Completed', method: 'Card' },
    { id: 2, type: 'Expense Claim', amount: '+$45.00', date: 'Feb 20, 2026', status: 'Completed', method: 'Card' },
    { id: 3, type: 'Bank Withdrawal', amount: '-$1,000.00', date: 'Feb 15, 2026', status: 'Pending', method: 'USD' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Welcome back, Alex!</h1>
          <p className="text-zinc-500 font-medium mt-1">Here's what's happening with your earnings today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2">
            <History className="w-4 h-4" />
            View History
          </button>
          <button className="px-6 py-3 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Claim
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white rounded-[40px] border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Recent Activity</h2>
            <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-50">
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Transaction</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Method</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="group hover:bg-zinc-50/50 transition-colors cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            tx.amount.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-600"
                          )}>
                            {tx.amount.startsWith('+') ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-black text-zinc-900">{tx.type}</p>
                            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{tx.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          {tx.method === 'Card' ? <CreditCard className="w-4 h-4 text-zinc-400" /> : <Globe className="w-4 h-4 text-zinc-400" />}
                          <span className="text-sm font-bold text-zinc-600">{tx.method}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "text-sm font-black tracking-tight",
                          tx.amount.startsWith('+') ? "text-emerald-600" : "text-zinc-900"
                        )}>
                          {tx.amount}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            tx.status === 'Completed' ? "bg-emerald-500" : "bg-amber-500"
                          )} />
                          <span className="text-xs font-black text-zinc-600 uppercase tracking-widest">{tx.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions / Sidebar */}
        <div className="space-y-8">
          <div className="bg-zinc-950 rounded-[40px] p-8 text-white shadow-2xl shadow-zinc-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
            <h3 className="text-xl font-black tracking-tight mb-2 relative z-10">Quick Actions</h3>
            <p className="text-zinc-400 text-sm mb-8 relative z-10">Access your payment tools and settings.</p>

            <div className="space-y-4 relative z-10">
              <button className="w-full py-4 bg-white text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" />
                Transfer to Bank
              </button>
              <button className="w-full py-4 bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Settings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-6">Pending Claims</h3>
            
            {pendingClaims.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">No pending claims</p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-900">Payroll #{claim.payrollRunId.slice(-6)}</p>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          {new Date(claim.payrollDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-zinc-900">${claim.amount.toLocaleString()}</p>
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pending</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button className="w-full mt-8 py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 font-black text-xs uppercase tracking-widest hover:border-zinc-950 hover:text-zinc-950 transition-all">
              Submit New Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default EmployeeDashboard;
