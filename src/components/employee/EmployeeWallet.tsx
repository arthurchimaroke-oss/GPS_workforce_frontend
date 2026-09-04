import React from 'react';
import {
  CreditCard,
  Copy,
  ExternalLink,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Plus,
  Search,
  Filter,
  DollarSign,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeWallet = () => {
  const [activeTab, setActiveTab] = React.useState<'payments' | 'history'>('payments');

  const paymentMethods = [
    { name: 'Flutterwave Card', type: 'Visa', last4: '4242', balance: '2,450.00', value: '$2,450.00', change: 'Primary', icon: CreditCard },
    { name: 'Bank Account', type: 'Chase', last4: '8821', balance: '1,800.00', value: '$1,800.00', change: 'Linked', icon: DollarSign },
  ];

  const transactions = [
    { id: 1, type: 'Received', asset: 'Salary', amount: '1,200.00', from: 'Payroll Run #8824', date: 'Mar 15, 2026', status: 'Completed' },
    { id: 2, type: 'Withdrawn', asset: 'Bank Transfer', amount: '500.00', to: 'Bank ****8821', date: 'Mar 12, 2026', status: 'Completed' },
    { id: 3, type: 'Received', asset: 'Bonus', amount: '450.00', from: 'Q1 Performance Bonus', date: 'Mar 10, 2026', status: 'Completed' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Payment Center</h1>
          <p className="text-zinc-500 font-medium mt-1">Manage your payments, withdrawals, and history securely.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2">
            <ArrowDownCircle className="w-4 h-4" />
            Withdraw
          </button>
          <button className="px-6 py-3 bg-white border border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2">
            <ArrowUpCircle className="w-4 h-4" />
            Payment Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Total Balance Card */}
          <div className="bg-zinc-950 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-zinc-200 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Secured by Flutterwave</span>
              </div>
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-2">Available Balance</p>
              <div className="flex items-baseline gap-4">
                <h2 className="text-6xl font-black tracking-tighter">$4,250.00</h2>
                <span className="text-emerald-400 font-black text-sm">+12.5% this month</span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-zinc-300">Payment Method Active</span>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-300">Card ****4242</span>
                  <Copy className="w-3 h-3 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods / History Tabs */}
          <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-zinc-50">
              <button
                onClick={() => setActiveTab('payments')}
                className={cn(
                  "flex-1 py-6 text-xs font-black uppercase tracking-widest transition-all relative",
                  activeTab === 'payments' ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                Payment Methods
                {activeTab === 'payments' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-950" />}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={cn(
                  "flex-1 py-6 text-xs font-black uppercase tracking-widest transition-all relative",
                  activeTab === 'history' ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                Transaction History
                {activeTab === 'history' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-950" />}
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'payments' ? (
                <div className="space-y-2">
                  {paymentMethods.map((method, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-50 rounded-3xl transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 p-2.5 text-emerald-600 group-hover:scale-110 transition-transform">
                          <method.icon className="w-full h-full" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-zinc-900">{method.name}</p>
                          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{method.type} ****{method.last4}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-zinc-900">{method.balance}</p>
                        <p className="text-xs text-zinc-500 font-bold">{method.change}</p>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full mt-4 p-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 font-black text-xs uppercase tracking-widest hover:border-zinc-950 hover:text-zinc-950 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Payment Method
                  </button>
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          tx.type === 'Received' ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-600"
                        )}>
                          {tx.type === 'Received' ? <ArrowDownCircle className="w-5 h-5" /> : <ArrowUpCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-zinc-900">{tx.type} - {tx.asset}</p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{tx.from || tx.to} • {tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "text-sm font-black tracking-tight",
                          tx.type === 'Received' ? "text-emerald-600" : "text-zinc-900"
                        )}>
                          {tx.type === 'Received' ? '+' : '-'}${tx.amount}
                        </p>
                        <div className="flex items-center gap-1 justify-end">
                          {tx.status === 'Completed' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-500" />
                          )}
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{tx.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
          <div className="bg-white rounded-[40px] p-8 border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-6">Quick Withdraw</h3>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Amount</p>
                <input 
                  type="text" 
                  placeholder="$0.00" 
                  className="w-full bg-transparent border-none text-left font-black text-2xl focus:ring-0 p-0" 
                />
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">To</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-colors">
                    <DollarSign className="w-4 h-4 text-zinc-600" />
                    <span className="text-xs font-black">Bank ****8821</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-4 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
                Withdraw to Bank
              </button>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[40px] p-8 border border-emerald-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
            <h3 className="text-xl font-black text-emerald-900 tracking-tight mb-2 relative z-10">Payment Protection</h3>
            <p className="text-emerald-700/70 text-sm mb-6 relative z-10">Your payments are secured by Flutterwave's enterprise-grade infrastructure.</p>
            <button className="text-xs font-black text-emerald-700 uppercase tracking-widest hover:text-emerald-900 transition-colors flex items-center gap-2 relative z-10">
              Security Settings <ArrowRight className="w-4 h-4" />
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

export default EmployeeWallet;
