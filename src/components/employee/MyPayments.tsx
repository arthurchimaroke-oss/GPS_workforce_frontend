import React from 'react';
import {
  DollarSign,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  Search,
  Calendar,
  FileText,
  TrendingUp,
  CreditCard,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const MyPayments = () => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'salary' | 'bonus' | 'reimbursement'>('all');

  const paymentStats = [
    { label: 'Total Earnings (YTD)', value: '$42,500.00', change: '+15%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Last Payment', value: '$3,500.00', change: 'Feb 25', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Claims', value: '$120.50', change: '2 items', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const payments = [
    { id: 1, title: 'February Salary', amount: '$3,500.00', date: 'Feb 25, 2026', type: 'salary', method: 'Card', status: 'Completed' },
    { id: 2, title: 'Q1 Performance Bonus', amount: '$1,200.00', date: 'Feb 20, 2026', type: 'bonus', method: 'Card', status: 'Completed' },
    { id: 3, title: 'Internet Stipend', amount: '$45.00', date: 'Feb 15, 2026', type: 'reimbursement', method: 'Card', status: 'Completed' },
    { id: 4, title: 'January Salary', amount: '$3,500.00', date: 'Jan 25, 2026', type: 'salary', method: 'Card', status: 'Completed' },
    { id: 5, title: 'Travel Reimbursement', amount: '$250.00', date: 'Jan 10, 2026', type: 'reimbursement', method: 'Bank', status: 'Completed' },
  ];

  const filteredPayments = activeFilter === 'all' 
    ? payments 
    : payments.filter(p => p.type === activeFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">My Payments</h1>
          <p className="text-zinc-500 font-medium mt-1">Track your earnings, bonuses, and reimbursements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export History
          </button>
          <button className="px-6 py-3 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Tax Documents
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentStats.map((stat, i) => (
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

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-2 p-1.5 bg-zinc-100 rounded-2xl w-fit">
          {['all', 'salary', 'bonus', 'reimbursement'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeFilter === filter 
                  ? "bg-white text-zinc-950 shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search payments..." 
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-zinc-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-zinc-950 transition-all"
          />
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-50">
                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Payment Details</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Method</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="group hover:bg-zinc-50/50 transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-black text-zinc-900">{payment.title}</p>
                        <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{payment.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-3 py-1 bg-zinc-100 rounded-full">
                      {payment.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {payment.method === 'Bank' ? <Globe className="w-4 h-4 text-zinc-400" /> : <CreditCard className="w-4 h-4 text-zinc-400" />}
                      <span className="text-sm font-bold text-zinc-600">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-zinc-900 tracking-tight">{payment.amount}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black text-zinc-600 uppercase tracking-widest">{payment.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-zinc-100 rounded-xl transition-colors">
                      <Download className="w-4 h-4 text-zinc-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-950 rounded-[40px] p-10 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
          <h3 className="text-2xl font-black tracking-tight mb-2 relative z-10">Earnings Breakdown</h3>
          <p className="text-zinc-400 text-sm mb-8 relative z-10">A detailed view of your income sources this year.</p>
          
          <div className="space-y-6 relative z-10">
            {[
              { label: 'Base Salary', amount: '$35,000.00', percentage: 82, color: 'bg-emerald-500' },
              { label: 'Performance Bonus', amount: '$6,500.00', percentage: 15, color: 'bg-blue-500' },
              { label: 'Reimbursements', amount: '$1,000.00', percentage: 3, color: 'bg-purple-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-zinc-400">{item.label}</span>
                  <span>{item.amount}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 border border-zinc-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-600 mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Tax Ready</h3>
          <p className="text-zinc-500 text-sm max-w-xs mb-8">All your payment records are verified and ready for the 2026 tax season.</p>
          <button className="px-8 py-4 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
            Download Tax Summary
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default MyPayments;
