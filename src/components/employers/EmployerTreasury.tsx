import React from 'react';
import {
  Plus,
  CreditCard,
  Building2,
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import SidebarLayout from '@/components/layout/SidebarLayout';

export default function EmployerFund() {
  return (
    <SidebarLayout>
      <EmployerFundContent />
    </SidebarLayout>
  );
}

function EmployerFundContent() {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = React.useState('card');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
    toast({ title: 'Address copied to clipboard!' });
  };

  const handleConnectPlaid = () => {
    setIsProcessing(true);
    toast({ title: 'Connecting to Plaid...' });
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: 'Bank account connected successfully!' });
    }, 2000);
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    toast({ title: 'Processing payment...' });
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: 'Funds added successfully!' });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Fund Company Treasury</h1>
          <p className="text-zinc-500">Add funds to your company treasury to pay your workforce.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2">Select Method</h3>

          <MethodCard
            id="card"
            title="Debit/Credit Card"
            desc="Instant Payment"
            icon={CreditCard}
            color="text-purple-500"
            active={selectedMethod === 'card'}
            onClick={() => setSelectedMethod('card')}
          />

          <MethodCard
            id="bank"
            title="Bank Transfer"
            desc="ACH, Wire, SEPA"
            icon={Building2}
            color="text-blue-500"
            active={selectedMethod === 'bank'}
            onClick={() => setSelectedMethod('bank')}
          />
        </div>

        {/* Action Area */}
        <div className="md:col-span-2">
          {selectedMethod === 'bank' && (
            <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm space-y-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">Connect Your Bank</h3>
                <p className="text-sm text-zinc-500 mt-2">Use Plaid to securely connect your bank account for instant transfers.</p>
              </div>
              
              <button 
                onClick={handleConnectPlaid}
                disabled={isProcessing}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? "Connecting..." : "Connect with Plaid"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 pt-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Plaid_logo.svg" alt="Plaid" className="h-4 opacity-30" />
                <div className="w-px h-4 bg-zinc-200" />
                <div className="flex items-center gap-1 opacity-30">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">AES-256 Encrypted</span>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm space-y-6">
              <form onSubmit={handlePurchase} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 block">Card Number</label>
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                      <span className="text-sm text-zinc-400">•••• •••• •••• ••••</span>
                      <CreditCard className="w-4 h-4 text-zinc-300" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 block">Expiry</label>
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                      <span className="text-sm text-zinc-400">MM/YY</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 block">CVC</label>
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                      <span className="text-sm text-zinc-400">•••</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 block">Amount to Purchase</label>
                  <div className="relative">
                    <input type="number" placeholder="0.00" className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-2xl font-bold outline-none focus:border-black transition-all" required />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">USD</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Add Funds"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MethodCard({ id, title, desc, icon: Icon, color, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200",
        active 
          ? "bg-white border-black shadow-lg shadow-zinc-200" 
          : "bg-white border-zinc-200 hover:border-zinc-300"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-zinc-900">{title}</p>
          <p className="text-[10px] text-zinc-500 font-medium">{desc}</p>
        </div>
      </div>
      {active && <div className="w-2 h-2 bg-black rounded-full" />}
    </button>
  );
}
