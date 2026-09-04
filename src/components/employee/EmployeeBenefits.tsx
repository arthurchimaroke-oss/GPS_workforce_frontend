import React from 'react';
import { 
  Heart, 
  Stethoscope, 
  ShieldCheck, 
  TrendingUp, 
  Umbrella, 
  Coffee, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Plus,
  ArrowRight,
  Info,
  Star,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const EmployeeBenefits = () => {
  const activePlans = [
    { title: 'Premium Health', provider: 'BlueCross BlueShield', type: 'Health', status: 'Active', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: '401(k) Retirement', provider: 'Fidelity Investments', type: 'Retirement', status: 'Active', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Life Insurance', provider: 'MetLife', type: 'Insurance', status: 'Active', icon: Umbrella, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const wellnessPerks = [
    { title: 'Gym Membership', desc: 'Monthly stipend for fitness centers.', value: '$50/mo', icon: Zap, status: 'Claimed' },
    { title: 'Mental Health', desc: 'Free access to Headspace & Calm.', value: 'Free', icon: Heart, status: 'Available' },
    { title: 'Learning Budget', desc: 'Annual budget for courses & books.', value: '$1,000/yr', icon: Star, status: 'Available' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">My Benefits</h1>
          <p className="text-zinc-500 font-medium mt-1">Manage your health, retirement, and wellness plans.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2">
            <Info className="w-4 h-4" />
            Benefits Guide
          </button>
          <button className="px-6 py-3 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Enroll in New Plan
          </button>
        </div>
      </div>

      {/* Active Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activePlans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white rounded-[40px] border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${plan.bg} ${plan.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <plan.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">{plan.status}</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{plan.type}</p>
            <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-1">{plan.title}</h3>
            <p className="text-sm text-zinc-500 font-medium mb-6">{plan.provider}</p>
            <button className="w-full py-3 bg-zinc-50 text-zinc-500 hover:bg-zinc-950 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
              View Details <ChevronRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wellness Perks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Wellness & Perks</h2>
            <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors flex items-center gap-1">
              View All Perks <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wellnessPerks.map((perk, i) => (
              <div key={i} className="p-6 bg-white rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-md transition-all group cursor-pointer flex items-center gap-6">
                <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-950 group-hover:text-white transition-all shrink-0">
                  <perk.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-black text-zinc-900 tracking-tight">{perk.title}</h4>
                    <span className="text-xs font-black text-emerald-600">{perk.value}</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium line-clamp-1 mb-3">{perk.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                      perk.status === 'Claimed' ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-400"
                    )}>
                      {perk.status}
                    </span>
                    {perk.status === 'Available' && (
                      <button className="text-[10px] font-black text-zinc-900 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                        Claim Now <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retirement Progress */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Retirement</h2>
          <div className="bg-zinc-950 rounded-[40px] p-8 text-white shadow-2xl shadow-zinc-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
            
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-1">401(k) Portfolio Value</p>
                <h3 className="text-4xl font-black tracking-tighter">$42,850.12</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-zinc-400">Monthly Contribution</span>
                  <span>$450.00</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-zinc-400">Employer Match</span>
                  <span className="text-emerald-400">100% up to 4%</span>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black tracking-tight">+12.4% YTD</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Market Performance</p>
                </div>
              </div>

              <button className="w-full py-4 bg-white text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all flex items-center justify-center gap-2">
                Manage Portfolio
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-zinc-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-zinc-900 tracking-tight">Open Enrollment</h4>
                <p className="text-xs text-zinc-500 font-medium">Ends in 14 days</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-6">
              The annual open enrollment period is currently active. You can make changes to your health and insurance plans until March 31st.
            </p>
            <button className="w-full py-4 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
              Review My Options
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

export default EmployeeBenefits;
