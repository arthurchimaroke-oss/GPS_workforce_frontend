import React from 'react';
import { 
  Globe, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  Info,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BankTransfer = () => {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [amount, setAmount] = React.useState('');
  const [selectedBank, setSelectedBank] = React.useState('Chase Bank (**** 4829)');

  const banks = [
    { id: 1, name: 'Chase Bank', account: '**** 4829', type: 'Checking' },
    { id: 2, name: 'Bank of America', account: '**** 9102', type: 'Savings' },
    { id: 3, name: 'Wells Fargo', account: '**** 3371', type: 'Checking' },
  ];

  const handleTransfer = () => {
    setStep(2);
    setTimeout(() => setStep(3), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Secure Bank Transfer</span>
        </div>
        <h1 className="text-5xl font-black text-zinc-900 tracking-tighter">Bank Transfer</h1>
        <p className="text-zinc-500 font-medium max-w-lg mx-auto">Withdraw your earnings directly to your linked bank account securely and instantly.</p>
      </div>

      {/* Main Transfer Card */}
      <div className="bg-white rounded-[48px] border border-zinc-100 shadow-2xl shadow-zinc-200/50 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-10 lg:p-16 space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Side: Input */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Amount to Transfer</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                        <span className="text-4xl font-black text-zinc-900 group-focus-within:text-emerald-500 transition-colors">$</span>
                      </div>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-16 pr-8 py-8 bg-zinc-50 border-2 border-transparent rounded-[32px] text-4xl font-black text-zinc-900 focus:bg-white focus:border-zinc-950 transition-all placeholder:text-zinc-200"
                      />
                    </div>
                    <div className="flex items-center justify-between px-4">
                      <span className="text-xs font-bold text-zinc-400">Available: <span className="text-zinc-900">$4,250.00</span></span>
                      <button onClick={() => setAmount('4250')} className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors">Max Amount</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Select Destination</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Building2 className="w-6 h-6 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <select 
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full pl-16 pr-12 py-6 bg-zinc-50 border-2 border-transparent rounded-[24px] text-sm font-black text-zinc-900 focus:bg-white focus:border-zinc-950 transition-all appearance-none cursor-pointer"
                      >
                        {banks.map(bank => (
                          <option key={bank.id} value={`${bank.name} (${bank.account})`}>{bank.name} - {bank.account}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Summary */}
                <div className="bg-zinc-50 rounded-[40px] p-10 space-y-8">
                  <h3 className="text-xl font-black text-zinc-900 tracking-tight">Transfer Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold text-zinc-500">
                      <span>Withdrawal Amount</span>
                      <span className="text-zinc-900">${amount || '0.00'} USD</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-zinc-500">
                      <span>Processing Fee</span>
                      <span className="text-zinc-900">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-zinc-500">
                      <span>Processing Time</span>
                      <span className="text-zinc-900">Instant (Real-time)</span>
                    </div>
                    <div className="h-px bg-zinc-200 my-4" />
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-black text-zinc-900 uppercase tracking-widest">You'll Receive</span>
                      <span className="text-3xl font-black text-zinc-900 tracking-tighter">${amount || '0.00'}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-zinc-100 flex gap-3">
                    <Zap className="w-5 h-5 text-emerald-500 shrink-0" />
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                      Transfers to <span className="font-black text-zinc-900">Chase Bank</span> are processed via RTP (Real-Time Payments) and are typically available within seconds.
                    </p>
                  </div>

                  <button 
                    onClick={handleTransfer}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="w-full py-5 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Confirm Transfer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-20 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-zinc-100 rounded-[32px] flex items-center justify-center">
                  <RefreshCw className="w-10 h-10 text-zinc-900 animate-spin" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Processing Transfer</h3>
                <p className="text-zinc-500 font-medium">We're converting your assets and sending them to your bank.</p>
              </div>
              <div className="w-64 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-zinc-950"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-20 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Transfer Successful!</h3>
                <p className="text-zinc-500 font-medium">Your funds are on their way to {selectedBank}.</p>
              </div>
              <div className="bg-zinc-50 rounded-3xl p-6 w-full max-w-sm space-y-3">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-400">
                  <span>Transaction ID</span>
                  <span className="text-zinc-900">#TRX-928471</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-400">
                  <span>Amount Received</span>
                  <span className="text-zinc-900">${amount} USD</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-400">
                  <span>Estimated Arrival</span>
                  <span className="text-emerald-600">Instant</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setStep(1);
                  setAmount('');
                }}
                className="px-10 py-4 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
              >
                Back to Payments
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Real-Time Payments', desc: 'Most transfers are completed in under 60 seconds.', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { title: 'Bank-Grade Security', desc: 'Your data is encrypted with AES-256 standards.', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'Global Coverage', desc: 'Transfer to over 150+ countries and 50+ currencies.', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((info, i) => (
          <div key={i} className="p-8 bg-white rounded-[40px] border border-zinc-100 shadow-sm flex flex-col items-center text-center group">
            <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
              <info.icon className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-black text-zinc-900 tracking-tight mb-2">{info.title}</h4>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">{info.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default BankTransfer;
