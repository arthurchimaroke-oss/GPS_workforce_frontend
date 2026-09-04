import React from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  History,
  ExternalLink,
  Copy,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  PieChart as PieChartIcon,
  Activity,
  CreditCard,
  Building2,
  Globe,
  Lock,
  RefreshCw,
  MoreVertical,
  ChevronRight,
  Search
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import SidebarLayout from '@/components/layout/SidebarLayout';

const treasuryData = [
  { name: 'Mon', value: 1100000 },
  { name: 'Tue', value: 1150000 },
  { name: 'Wed', value: 1120000 },
  { name: 'Thu', value: 1210000 },
  { name: 'Fri', value: 1180000 },
  { name: 'Sat', value: 1240500 },
  { name: 'Sun', value: 1240500 },
];

const assetDistribution = [
  { name: 'USD Reserves', value: 60, color: '#10b981' },
  { name: 'EUR Reserves', value: 25, color: '#3b82f6' },
  { name: 'GBP Reserves', value: 10, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#6366f1' },
];

export default function EmployerWallet() {
  return (
    <SidebarLayout>
      <EmployerWalletContent />
    </SidebarLayout>
  );
}

function EmployerWalletContent() {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  const accountId = "ACC-742d-35Cc-6634";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Total Treasury', value: '$1,240,500.00', change: '+12.5%', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Monthly Spend', value: '$450,200.00', change: '-2.3%', icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Payroll', value: '$125,000.00', change: 'Due in 5d', icon: History, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const assets = [
    { name: 'USD Account', symbol: 'USD', balance: '480,150.00', value: '$480,150.00', yield: '4.2%', icon: DollarSign },
    { name: 'EUR Account', symbol: 'EUR', balance: '744,000.00', value: '$744,000.00', yield: '3.1%', icon: EuroSign },
    { name: 'USD Savings', symbol: 'USD-S', balance: '16,350.00', value: '$16,350.00', yield: '5.1%', icon: PiggyBank },
    { name: 'Operating Fund', symbol: 'OPF', balance: '12,000.00', value: '$12,000.00', yield: '4.8%', icon: TrendingUp },
  ];

  const transactions = [
    { id: '1', type: 'Payroll Run #8824', amount: '-$125,000.00', status: 'Completed', date: 'Mar 15, 2026', method: 'Flutterwave' },
    { id: '2', type: 'Treasury Funding', amount: '+$50,000.00', status: 'Completed', date: 'Mar 12, 2026', method: 'Bank Transfer' },
    { id: '3', type: 'Bonus Distribution', amount: '-$12,500.00', status: 'Completed', date: 'Mar 10, 2026', method: 'Flutterwave' },
    { id: '4', type: 'Payroll Run #8823', amount: '-$125,000.00', status: 'Completed', date: 'Feb 15, 2026', method: 'Flutterwave' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
              Treasury Active
            </span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Payment Provider: Flutterwave</span>
          </div>
          <h1 className="text-4xl font-black text-zinc-950 tracking-tighter">Company Treasury</h1>
          <p className="text-zinc-500 font-medium">Manage your corporate funds, funding, and global disbursements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast({ title: 'Opening receive funds modal...' })}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowDownLeft className="w-4 h-4" />
            Receive
          </button>
          <button
            onClick={() => toast({ title: 'Redirecting to funding page...' })}
            className="btn-primary flex items-center gap-2 shadow-xl shadow-emerald-100"
          >
            <Plus className="w-4 h-4" />
            Fund Treasury
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-zinc-200/60 shadow-premium hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={cn("p-3 rounded-2xl border transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full",
                  stat.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-zinc-50 text-zinc-600"
                )}>
                  {stat.change}
                </span>
              </div>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-zinc-950 tracking-tighter mt-1">{stat.value}</h3>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 rounded-full -mr-12 -mt-12 opacity-50" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Treasury Health Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-zinc-200/60 shadow-premium relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-zinc-950 text-xl tracking-tight">Treasury Performance</h3>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Total value over last 7 days</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-zinc-100 p-1 rounded-xl">
                <button className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white text-zinc-950 rounded-lg shadow-sm">7D</button>
                <button className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors">30D</button>
              </div>
              <button
                onClick={() => toast({ title: 'Refreshing treasury data...' })}
                className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={treasuryData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{fontSize: 10, fill: '#A1A1AA', fontWeight: 700}}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{fontSize: 10, fill: '#A1A1AA', fontWeight: 700}}
                  dx={-10}
                  tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '24px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '16px'
                  }}
                  itemStyle={{ fontWeight: 900, fontSize: '12px' }}
                  labelStyle={{ fontWeight: 900, fontSize: '10px', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '4px' }}
                  formatter={(val: number) => [`$${val.toLocaleString()}`, 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Account Details & Security */}
        <div className="bg-zinc-950 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full -mr-24 -mt-24 blur-[80px] group-hover:bg-emerald-500/30 transition-colors" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Security Level</p>
                <p className="text-lg font-black text-emerald-400">Multi-Factor Auth</p>
              </div>
            </div>

            <div className="space-y-8 flex-1">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Account ID</p>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 group/address cursor-pointer hover:bg-white/10 transition-all" onClick={handleCopy}>
                  <code className="text-xs font-mono text-zinc-300 truncate mr-4">{accountId}</code>
                  <div className="shrink-0">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-500 group-hover/address:text-white" />}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Provider</p>
                  <p className="text-sm font-black flex items-center gap-2">
                    <Globe className="w-3 h-3 text-blue-400" />
                    Flutterwave
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Last Audit</p>
                  <p className="text-sm font-black flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    2 days ago
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <button
                onClick={() => toast({ title: 'Managing account permissions...' })}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 rounded-2xl text-[10px] font-black text-zinc-950 uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
              >
                Manage Permissions
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => toast({ title: 'Viewing account details...' })}
                className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest transition-all"
              >
                View Account Details
              </button>
            </div>
          </div>
        </div>

        {/* Assets List */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-zinc-200/60 p-8 shadow-premium">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-zinc-950 text-xl tracking-tight">Treasury Assets</h3>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Portfolio breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toast({ title: 'Opening asset search...' })}
                className="p-2 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <Search className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => toast({ title: 'Opening asset options...' })}
                className="p-2 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map((asset, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-[32px] border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-all group cursor-pointer relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 p-3 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm text-emerald-600">
                    <asset.icon className="w-full h-full" />
                  </div>
                  <div>
                    <p className="font-black text-zinc-950 text-lg">{asset.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{asset.symbol}</span>
                      {asset.yield !== '0%' && (
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                          {asset.yield} APY
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right relative z-10">
                  <p className="font-black text-zinc-950 text-lg">{asset.balance}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{asset.value}</p>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-zinc-50 rounded-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <div
              onClick={() => toast({ title: 'Opening add new asset modal...' })}
              className="flex items-center justify-center p-6 rounded-[32px] border border-dashed border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all group cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                  <Plus className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-zinc-900 transition-colors">Add New Asset</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution & Activity */}
        <div className="space-y-8">
          {/* Asset Distribution */}
          <div className="bg-white rounded-[40px] border border-zinc-200/60 p-8 shadow-premium">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-black text-zinc-950 text-xl tracking-tight">Allocation</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Currency distribution</p>
              </div>
              <PieChartIcon className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {assetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {assetDistribution.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-zinc-950">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-[40px] border border-zinc-200/60 p-8 shadow-premium">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-black text-zinc-950 text-xl tracking-tight">Activity</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Latest events</p>
              </div>
              <button
                onClick={() => toast({ title: 'Loading full activity log...' })}
                className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
            <div className="space-y-6">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                      tx.amount.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    )}>
                      {tx.amount.startsWith('+') ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-950 truncate max-w-[120px]">{tx.type}</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-black", tx.amount.startsWith('+') ? "text-emerald-600" : "text-zinc-950")}>
                      {tx.amount}
                    </p>
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{tx.method}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => toast({ title: 'Loading full transaction history...' })}
              className="w-full mt-8 py-4 bg-zinc-50 hover:bg-zinc-100 rounded-2xl text-[10px] font-black text-zinc-950 uppercase tracking-widest transition-all"
            >
              View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing icon components
function DollarSign({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function EuroSign({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12M4 14h12M17.5 4.5c-3-3-8.5-3-11.5 1.5s-3 10 0 14.5S14.5 23 17.5 20" />
    </svg>
  );
}

function PiggyBank({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2" />
      <path d="M2 9.5a.5.5 0 1 0 1 0 .5.5 0 1 0-1 0" />
      <path d="M12.5 12a.5.5 0 1 0 0-1 .5.5 0 1 0 0 1z" />
    </svg>
  );
}
