import React, { ChangeEvent, ElementType, ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Calendar, Wallet, ShieldAlert,
  Building2, MapPin, CreditCard, Briefcase, CheckCircle2,
  Loader2, AlertCircle, Lock, BadgeCheck, ChevronRight,
  ChevronLeft, Camera, Globe, FileText, Users,
  Link as LinkIcon, Clock, XCircle, Banknote,
} from 'lucide-react';
import { useEmployee } from '@/components/context/employeeContext';
import { useSearchParams } from 'react-router-dom';
import { CompanyInfo, FormData } from '@/types/OnboardingTypes';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

const EMPTY: FormData = {
  password: "", 
  profile_photo_url: '',
  first_name: '', last_name: '', email: '', phone: '',
  date_of_birth: '', gender: '', nationality: '', marital_status: '',
  address_street: '', address_city: '', address_state: '',
  address_country: '', address_postal_code: '',
  gov_id_type: '', gov_id_number: '', tax_id: '',
  bank_name: '', bank_account_name: '', bank_account_number: '',
  bank_routing_number: '', wallet_address: '',
  emergency_contact_name: '', emergency_contact_phone: '',
  emergency_contact_relationship: '',
  next_of_kin_name: '', next_of_kin_phone: '', next_of_kin_relationship: '',
  linkedin_url: '', availability_date: '', referred_by: '',
};

// ─────────────────────────────────────────────────────────────────────────────
// Steps — Step 1 is now the Offer page, not counted in the form progress
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Offer',     icon: Building2,   color: 'bg-zinc-900'    },
  { id: 2, label: 'Personal',  icon: User,         color: 'bg-blue-600'   },
  { id: 3, label: 'Address',   icon: MapPin,       color: 'bg-violet-600' },
  { id: 4, label: 'Identity',  icon: FileText,     color: 'bg-amber-600'  },
  { id: 5, label: 'Payment',   icon: CreditCard,   color: 'bg-emerald-600'},
  { id: 6, label: 'Emergency', icon: ShieldAlert,  color: 'bg-red-600'    },
  { id: 7, label: 'Other',     icon: Briefcase,    color: 'bg-pink-600'   },
  { id: 8, label: 'Review',    icon: BadgeCheck,   color: 'bg-zinc-900'   },
];

// ─────────────────────────────────────────────────────────────────────────────
// Validation — unchanged
// ─────────────────────────────────────────────────────────────────────────────

function validate(step: number, f: FormData): string {
  if (step === 2) {
    if (!f.first_name.trim())   return 'First name is required.';
    if (!f.last_name.trim())    return 'Last name is required.';
    if (!f.email.trim())        return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return 'Enter a valid email address.';
    if (!f.phone.trim())        return 'Phone number is required.';
    if (!f.date_of_birth)       return 'Date of birth is required.';
    if (!f.gender)              return 'Please select your gender.';
    if (!f.nationality.trim())  return 'Nationality is required.';
  }
  if (step === 3) {
    if (!f.address_street.trim())  return 'Street address is required.';
    if (!f.address_city.trim())    return 'City is required.';
    if (!f.address_country.trim()) return 'Country is required.';
  }
  if (step === 4) {
    if (!f.gov_id_type)           return 'Please select an ID type.';
    if (!f.gov_id_number.trim())  return 'ID number is required.';
  }
  if (step === 5) {
    if (!f.bank_name.trim() && !f.wallet_address.trim())
      return 'Please provide at least one payment method — bank account or wallet address.';
    if (f.bank_name.trim() && !f.bank_account_number.trim())
      return 'Account number is required when a bank name is provided.';
  }
  if (step === 6) {
    if (!f.emergency_contact_name.trim())   return 'Emergency contact name is required.';
    if (!f.emergency_contact_phone.trim())  return 'Emergency contact phone is required.';
    if (!f.emergency_contact_relationship)  return 'Please select your relationship to the emergency contact.';
  }
  return '';
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers & primitives — unchanged
// ─────────────────────────────────────────────────────────────────────────────

function cn(...cls: (string | boolean | undefined)[]) {
  return cls.filter(Boolean).join(' ');
}

const baseCls = [
  'w-full px-4 py-3 text-sm font-medium text-zinc-900 bg-white',
  'border border-zinc-200 rounded-xl placeholder:text-zinc-300',
  'focus:outline-none focus:border-zinc-900 transition-colors',
  'disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed',
].join(' ');

function Label({ text, required, hint }: { text: string; required?: boolean; hint?: string }) {
  return (
    <div className="mb-1.5">
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
        {text}{required && <span className="text-red-400 ml-0.5">*</span>}
      </p>
      {hint && <p className="text-[10px] text-zinc-400 font-medium mt-0.5 leading-snug">{hint}</p>}
    </div>
  );
}

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: ReactNode;
}) {
  return (
    <div>
      <Label text={label} required={required} hint={hint} />
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', icon: Icon, disabled }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; icon?: ElementType; disabled?: boolean;
}) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />}
      <input
        type={type} value={value} placeholder={placeholder} disabled={disabled}
        onChange={e => onChange(e.target.value)}
        className={cn(baseCls, Icon ? 'pl-10' : '')}
      />
    </div>
  );
}

function SelectInput({ value, onChange, children, disabled }: {
  value: string; onChange: (v: string) => void; children: ReactNode; disabled?: boolean;
}) {
  return (
    <select
      value={value} disabled={disabled}
      onChange={e => onChange(e.target.value)}
      className={cn(baseCls, 'appearance-none cursor-pointer', !value ? 'text-zinc-300' : '')}
    >
      {children}
    </select>
  );
}

function ReadonlyBadge({ label, value, icon: Icon }: { label: string; value: string; icon?: ElementType }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100">
      {Icon && <Icon className="w-4 h-4 text-zinc-400 shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-zinc-700 truncate">{value || '—'}</p>
      </div>
      <Lock className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-5', className)}>
      {children}
    </div>
  );
}

function G2({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function RRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-zinc-50 last:border-0 gap-4">
      <span className="text-xs text-zinc-500 font-medium shrink-0">{label}</span>
      <span className="text-xs font-black text-zinc-900 text-right break-all">{value || '—'}</span>
    </div>
  );
}

function StepHeader({ icon: Icon, color, title, sub }: {
  icon: ElementType; color: string; title: string; sub: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white', color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-2xl font-black text-zinc-950 tracking-tight leading-tight">{title}</h2>
        <p className="text-sm text-zinc-500 font-medium mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function EmployeeOnboarding() {
  const {submitOnboardingForm} = useEmployee()
  const [searchParams] = useSearchParams();
  const t = searchParams.get('token');
  const { checkTokenValidity } = useEmployee();

  const [token, setToken]               = useState('');
  const [company, setCompany]           = useState<CompanyInfo | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [tokenError, setTokenError]     = useState('');

  const [step, setStep]                 = useState(1);
  const [form, setForm]                 = useState<FormData>(EMPTY);
  const [stepError, setStepError]       = useState('');

  // ── NEW: offer acceptance state ──
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [declined, setDeclined]           = useState(false);

  const [submitting, setSubmitting]     = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [submitError, setSubmitError]   = useState('');
  const [tokenUsedOrExpired , settTokenUsedOrExpired] = useState(false)

  const photoRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => {
    const loadInvite = async () => {
      if (!t) {
        setTokenError("Missing onboarding token");
        setTokenLoading(false);
        return;
      }
      try {
        setToken(t);
        const data = await checkTokenValidity(t);
        setCompany(data);
      } catch (err: any) {
        setTokenError(err.message || "Failed to load invitation");
      } finally {
        setTokenLoading(false);
      }
    };
    loadInvite();
  }, []);

  const set = (field: keyof FormData) => (value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setStepError('');
  };

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    set('profile_photo_url')(url);
  };

  const handleAcceptOffer = () => {
    setOfferAccepted(true);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeclineOffer = () => {
    setDeclined(true);
  };

  const goNext = () => {
    const err = validate(step, form);
    if (err) { setStepError(err); return; }
    setStepError('');
    setStep(s => Math.min(s + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setStepError('');
    // If on step 2, going back returns them to the offer page
    if (step === 2) {
      setOfferAccepted(false);
      setStep(1);
    } else {
      setStep(s => Math.max(s - 1, 1));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!token) return;
    console.log("the form is " , form)
    let payload = {
      token, 
      company_id : company?.company_id ,
      job_title : company?.job_title,
      salary : company?.salary, 
      employment_type : company?.employment_type, 
      ...form
    }
    try {
      setSubmitting(true);
      let response = await submitOnboardingForm(payload)
      if (response.ok) {
        setSubmitted(true);

      }

    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (tokenLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto">
            <Loader2 className="w-7 h-7 text-white animate-spin" />
          </div>
          <p className="text-sm font-black text-zinc-950 uppercase tracking-widest">Verifying invitation</p>
          <p className="text-xs text-zinc-400 font-medium">This only takes a moment…</p>
        </div>
      </div>
    );
  }

  // ─── Bad / expired token ──────────────────────────────────────────────────
  if (tokenError) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="h-2 bg-red-500" />
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-black text-zinc-950 tracking-tight">Invitation unavailable</h2>
            <p className="text-sm text-zinc-500 font-medium mt-3 leading-relaxed">{tokenError}</p>
            <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <p className="text-xs text-zinc-500 font-medium">Contact the person who invited you or your HR team for a new link.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (tokenUsedOrExpired) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="h-2 bg-red-500" />
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-black text-zinc-950 tracking-tight">TOKEN USED OR EXPIRED</h2>
            <p className="text-sm text-zinc-500 font-medium mt-3 leading-relaxed">{tokenError}</p>
            <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <p className="text-xs text-zinc-500 font-medium">Contact the person who invited you or your HR team for a new link.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) return null;

  // ─── NEW: Declined screen ─────────────────────────────────────────────────
  if (declined) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden"
        >
          <div className="h-2 bg-zinc-300" />
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-8 h-8 text-zinc-400" />
            </div>
            <h2 className="text-xl font-black text-zinc-950 tracking-tight">Offer declined</h2>
            <p className="text-sm text-zinc-500 font-medium mt-3 leading-relaxed">
              You've declined the offer from <strong className="text-zinc-800">{company.company_name}</strong>. 
              The HR team will be notified automatically.
            </p>
            <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <p className="text-xs text-zinc-500 font-medium">
                Changed your mind? Reach out directly to the person who sent you this invitation to get a new link.
              </p>
            </div>
            <button
              onClick={() => setDeclined(false)}
              className="mt-6 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
            >
              ← Go back and reconsider
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Success ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden"
        >
          <div className="h-2 bg-emerald-500" />
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-emerald-300"
                initial={{ scale: 0.8, opacity: 0.8 }} animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <h2 className="text-2xl font-black text-zinc-950 tracking-tight">Submission received!</h2>
            <p className="text-sm text-zinc-500 font-medium mt-3 leading-relaxed">
              Thank you, <strong className="text-zinc-900">{form.first_name}</strong>. Your information has been submitted to{' '}
              <strong className="text-zinc-900">{company.company_name}</strong> for review.
            </p>
            <div className="mt-6 space-y-3 text-left">
              {[
                { icon: Clock,     label: "What's next",    value: 'HR will review your submission and reach out via email.' },
                { icon: Mail,      label: 'Confirmation to', value: form.email },
                { icon: Building2, label: 'Company',         value: company.company_name },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3.5 bg-zinc-50 rounded-xl border border-zinc-100">
                  <Icon className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-black text-zinc-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Main form ────────────────────────────────────────────────────────────
  const cur = STEPS[step - 1];
  const pct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {company.company_logo_url
              ? <img src={company.company_logo_url} alt={company.company_name} className="w-8 h-8 rounded-lg object-contain border border-zinc-100" />
              : <div className="w-8 h-8 bg-zinc-950 rounded-lg flex items-center justify-center shrink-0"><Building2 className="w-4 h-4 text-white" /></div>
            }
            <div>
              <p className="text-xs font-black text-zinc-950 leading-none">{company.company_name}</p>
              <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                {offerAccepted ? 'Employee Onboarding' : 'Offer Letter'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0', cur.color)}>
              <cur.icon className="w-3 h-3" />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              {offerAccepted ? `${cur.label} · ${step - 1}/${STEPS.length - 1}` : 'Your offer'}
            </span>
          </div>
        </div>
        {/* Progress bar — only shows after accepting */}
        {offerAccepted && (
          <div className="h-1 bg-zinc-100">
            <motion.div
              className="h-full bg-zinc-950"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: 'circOut' }}
            />
          </div>
        )}
      </div>

      {/* Step pill nav — only shows after accepting */}
      {offerAccepted && (
        <div className="max-w-2xl mx-auto px-5 pt-5">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {STEPS.filter(s => s.id > 1).map(s => {
              const done   = step > s.id;
              const active = step === s.id;
              const locked = step < s.id;
              return (
                <button
                  key={s.id} disabled={locked}
                  onClick={() => done && setStep(s.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap border transition-all shrink-0',
                    active ? `${s.color} text-white border-transparent` : '',
                    done   ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-pointer hover:bg-emerald-100' : '',
                    locked ? 'bg-white text-zinc-300 border-zinc-100 cursor-not-allowed' : '',
                  )}
                >
                  {done ? <CheckCircle2 className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-5 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }}
          >

            {/* ──────────────────────────────────────────────────────────────
                STEP 1 · Offer letter — NEW
            ────────────────────────────────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="pt-2">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                    Employment offer
                  </p>
                  <h1 className="text-3xl font-black text-zinc-950 tracking-tight leading-tight">
                    You've got an offer 🎉
                  </h1>
                  <p className="text-zinc-500 font-medium mt-3 text-sm leading-relaxed max-w-lg">
                    <strong className="text-zinc-900">{company.company_name}</strong> would like to bring you on board. 
                    Review the offer details below and let them know your decision.
                  </p>
                </div>

                {/* Offer details card */}
                <div className="bg-zinc-950 rounded-2xl overflow-hidden">
                  {/* Company header */}
                  <div className="px-6 pt-6 pb-5 flex items-center gap-4 border-b border-zinc-800">
                    {company.company_logo_url
                      ? <img src={company.company_logo_url} alt={company.company_name} className="w-12 h-12 rounded-xl object-contain bg-white p-1" />
                      : <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0"><Building2 className="w-6 h-6 text-zinc-400" /></div>
                    }
                    <div>
                      <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Offer from</p>
                      <p className="text-lg font-black text-white leading-tight">{company.company_name}</p>
                    </div>
                  </div>

                  {/* Offer details grid */}
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {company.job_title && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Role</p>
                        </div>
                        <p className="text-sm font-black text-white">{company.job_title}</p>
                      </div>
                    )}
                    {company.department && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-3.5 h-3.5 text-zinc-500" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Department</p>
                        </div>
                        <p className="text-sm font-black text-white">{company.department}</p>
                      </div>
                    )}
                    {company.employment_type && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <BadgeCheck className="w-3.5 h-3.5 text-zinc-500" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Employment type</p>
                        </div>
                        <p className="text-sm font-black text-white">{company.employment_type}</p>
                      </div>
                    )}
                    {company.start_date && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Start date</p>
                        </div>
                        <p className="text-sm font-black text-white">
                          {new Date(company.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    )}
                    {company.branch_name && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Branch / Location</p>
                        </div>
                        <p className="text-sm font-black text-white">{company.branch_name}</p>
                      </div>
                    )}
                    {company.salary && (
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 sm:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Salary</p>
                        </div>
                        <p className="text-2xl font-black text-emerald-400 tracking-tight">
                          {company.salary_currency ?? ''}{' '}
                          {Number(company.salary).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-medium mt-0.5">per annum</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Accept / Decline */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={handleDeclineOffer}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-zinc-200 bg-white text-sm font-black text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    Decline offer
                  </button>
                  <button
                    onClick={handleAcceptOffer}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 text-sm font-black text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Accept & continue
                  </button>
                </div>

                <p className="text-[11px] text-zinc-400 font-medium text-center pt-1">
                  Sent to <strong className="text-zinc-600">{company.invited_email}</strong>
                </p>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────
                STEP 2 · Personal — unchanged
            ────────────────────────────────────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-5">
                <StepHeader icon={User} color="bg-blue-600" title="Personal details" sub="This goes on your official employment record." />
                <Card>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Profile photo <span className="text-zinc-300 font-medium normal-case tracking-normal">(optional)</span>
                  </p>
                  <div className="flex items-center gap-5">
                    <div
                      onClick={() => photoRef.current?.click()}
                      className="w-20 h-20 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 hover:bg-zinc-100 transition-all overflow-hidden shrink-0"
                    >
                      {photoPreview
                        ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                        : <><Camera className="w-5 h-5 text-zinc-400" /><span className="text-[9px] text-zinc-400 font-bold mt-1">Upload</span></>
                      }
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-900">Upload a headshot</p>
                      <p className="text-[11px] text-zinc-400 font-medium mt-0.5">JPG or PNG · Max 5 MB · Square recommended</p>
                      <button onClick={() => photoRef.current?.click()} className="mt-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                        {photoPreview ? 'Change photo' : 'Choose file'}
                      </button>
                    </div>
                  </div>
                  <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </Card>
                <Card>
                  <G2>
                    <Field label="First name" required>
                      <TextInput value={form.first_name} onChange={set('first_name')} placeholder="Jane" icon={User} />
                    </Field>
                    <Field label="Last name" required>
                      <TextInput value={form.last_name} onChange={set('last_name')} placeholder="Doe" icon={User} />
                    </Field>
                  </G2>
                  <Field label="Email address" required hint="Should match the email where you received the invite.">
                    <TextInput value={form.email} onChange={set('email')} placeholder="jane.doe@email.com" type="email" icon={Mail} />
                  </Field>
                  <Field label="Phone number" required>
                    <TextInput value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" type="tel" icon={Phone} />
                  </Field>
                  <Field label="Password to be Used for account" required>
                    <TextInput value={form.password} onChange={set('password')} placeholder="+1 555 000 0000" type="tel" icon={Phone} />
                  </Field>
                  <G2>
                    <Field label="Date of birth" required>
                      <TextInput value={form.date_of_birth} onChange={set('date_of_birth')} type="date" icon={Calendar} />
                    </Field>
                    <Field label="Gender" required>
                      <SelectInput value={form.gender} onChange={set('gender')}>
                        <option value="" disabled>Select…</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </SelectInput>
                    </Field>
                  </G2>
                  <G2>
                    <Field label="Nationality" required>
                      <TextInput value={form.nationality} onChange={set('nationality')} placeholder="e.g. Nigerian" icon={Globe} />
                    </Field>
                    <Field label="Marital status">
                      <SelectInput value={form.marital_status} onChange={set('marital_status')}>
                        <option value="" disabled>Select…</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </SelectInput>
                    </Field>
                  </G2>
                </Card>
              </div>
            )}

            {/* Steps 3–8 are completely unchanged — paste your original code here */}

            {/* ──────────────────────────────────────────────────────────────
                STEP 3 · Address
            ────────────────────────────────────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-5">
                <StepHeader icon={MapPin} color="bg-violet-600" title="Home address" sub="Your current residential address." />
                <Card>
                  <Field label="Street address" required>
                    <TextInput value={form.address_street} onChange={set('address_street')} placeholder="123 Main Street, Apt 4B" icon={MapPin} />
                  </Field>
                  <G2>
                    <Field label="City" required>
                      <TextInput value={form.address_city} onChange={set('address_city')} placeholder="Lagos" />
                    </Field>
                    <Field label="State / Province">
                      <TextInput value={form.address_state} onChange={set('address_state')} placeholder="Lagos State" />
                    </Field>
                  </G2>
                  <G2>
                    <Field label="Country" required>
                      <TextInput value={form.address_country} onChange={set('address_country')} placeholder="Nigeria" icon={Globe} />
                    </Field>
                    <Field label="Postal / ZIP code">
                      <TextInput value={form.address_postal_code} onChange={set('address_postal_code')} placeholder="100001" />
                    </Field>
                  </G2>
                </Card>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────
                STEP 4 · Identity
            ────────────────────────────────────────────────────────────── */}
            {step === 4 && (
              <div className="space-y-5">
                <StepHeader icon={FileText} color="bg-amber-600" title="Identity verification" sub="Your government-issued ID and tax information." />
                <Card>
                  <G2>
                    <Field label="ID type" required>
                      <SelectInput value={form.gov_id_type} onChange={set('gov_id_type')}>
                        <option value="" disabled>Select…</option>
                        <option value="national_id">National ID Card</option>
                        <option value="passport">International Passport</option>
                        <option value="drivers_license">Driver's License</option>
                        <option value="voters_card">Voter's Card</option>
                        <option value="residence_permit">Residence Permit</option>
                      </SelectInput>
                    </Field>
                    <Field label="ID number" required>
                      <TextInput value={form.gov_id_number} onChange={set('gov_id_number')} placeholder="A12345678" icon={FileText} />
                    </Field>
                  </G2>
                  <Field label="Tax ID / TIN" hint="Your Tax Identification Number, if applicable.">
                    <TextInput value={form.tax_id} onChange={set('tax_id')} placeholder="e.g. 1234567890" />
                  </Field>
                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                      Your identity documents are encrypted and accessible only to your HR team. They will never be shared with third parties.
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────
                STEP 5 · Payment
            ────────────────────────────────────────────────────────────── */}
            {step === 5 && (
              <div className="space-y-5">
                <StepHeader icon={CreditCard} color="bg-emerald-600" title="Payment details" sub="Provide at least one method to receive your salary." />
                {company.salary && (
                  <div className="bg-zinc-950 rounded-2xl p-5 text-white flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Your salary</p>
                      <p className="text-2xl font-black tracking-tight mt-0.5">
                        {company.salary_currency ?? ''} {Number(company.salary).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <Wallet className="w-6 h-6 text-zinc-600" />
                  </div>
                )}
                <Card>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Bank account (fiat)</p>
                  <Field label="Bank name">
                    <TextInput value={form.bank_name} onChange={set('bank_name')} placeholder="e.g. Zenith Bank" icon={Building2} />
                  </Field>
                  <Field label="Account name" hint="Name exactly as it appears on the account.">
                    <TextInput value={form.bank_account_name} onChange={set('bank_account_name')} placeholder="Jane A. Doe" icon={User} />
                  </Field>
                  <G2>
                    <Field label="Account number">
                      <TextInput value={form.bank_account_number} onChange={set('bank_account_number')} placeholder="0123456789" icon={CreditCard} />
                    </Field>
                    <Field label="Sort / routing code" hint="Optional — if applicable.">
                      <TextInput value={form.bank_routing_number} onChange={set('bank_routing_number')} placeholder="021000021" />
                    </Field>
                  </G2>
                </Card>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────
                STEP 6 · Emergency
            ────────────────────────────────────────────────────────────── */}
            {step === 6 && (
              <div className="space-y-5">
                <StepHeader icon={ShieldAlert} color="bg-red-600" title="Emergency contacts" sub="Who should we call if something happens to you at work?" />
                <Card>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Primary emergency contact</p>
                  <G2>
                    <Field label="Full name" required>
                      <TextInput value={form.emergency_contact_name} onChange={set('emergency_contact_name')} placeholder="John Doe" icon={User} />
                    </Field>
                    <Field label="Relationship" required>
                      <SelectInput value={form.emergency_contact_relationship} onChange={set('emergency_contact_relationship')}>
                        <option value="" disabled>Select…</option>
                        <option value="spouse">Spouse / Partner</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="child">Child</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </SelectInput>
                    </Field>
                  </G2>
                  <Field label="Phone number" required>
                    <TextInput value={form.emergency_contact_phone} onChange={set('emergency_contact_phone')} placeholder="+1 555 000 0001" type="tel" icon={Phone} />
                  </Field>
                </Card>
                <Card>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Next of kin <span className="text-zinc-300 font-medium normal-case tracking-normal">(optional)</span>
                  </p>
                  <G2>
                    <Field label="Full name">
                      <TextInput value={form.next_of_kin_name} onChange={set('next_of_kin_name')} placeholder="Mary Doe" icon={User} />
                    </Field>
                    <Field label="Relationship">
                      <SelectInput value={form.next_of_kin_relationship} onChange={set('next_of_kin_relationship')}>
                        <option value="" disabled>Select…</option>
                        <option value="spouse">Spouse / Partner</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="child">Child</option>
                        <option value="other">Other</option>
                      </SelectInput>
                    </Field>
                  </G2>
                  <Field label="Phone number">
                    <TextInput value={form.next_of_kin_phone} onChange={set('next_of_kin_phone')} placeholder="+1 555 000 0002" type="tel" icon={Phone} />
                  </Field>
                </Card>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────
                STEP 7 · Other
            ────────────────────────────────────────────────────────────── */}
            {step === 7 && (
              <div className="space-y-5">
                <StepHeader icon={Briefcase} color="bg-pink-600" title="A few more things" sub="All optional — but helpful for HR and your team profile." />
                <Card>
                  <Field label="LinkedIn profile URL" hint="Your public LinkedIn so the team can connect.">
                    <TextInput value={form.linkedin_url} onChange={set('linkedin_url')} placeholder="https://linkedin.com/in/yourname" icon={LinkIcon} />
                  </Field>
                  <Field label="Earliest availability date" hint="When can you start? Leave blank if your start date is already confirmed.">
                    <TextInput value={form.availability_date} onChange={set('availability_date')} type="date" icon={Calendar} />
                  </Field>
                  <Field label="How did you hear about us?">
                    <SelectInput value={form.referred_by} onChange={set('referred_by')}>
                      <option value="" disabled>Select…</option>
                      <option value="referral">Employee referral</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="job_board">Job board (Indeed, Jobberman, etc.)</option>
                      <option value="company_website">Company website</option>
                      <option value="social_media">Social media</option>
                      <option value="recruiter">Recruiter / headhunter</option>
                      <option value="other">Other</option>
                    </SelectInput>
                  </Field>
                </Card>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────
                STEP 8 · Review & Submit
            ────────────────────────────────────────────────────────────── */}
            {step === 8 && (
              <div className="space-y-5">
                <StepHeader icon={BadgeCheck} color="bg-zinc-900" title="Review & submit" sub="Check everything before submitting. Click any section to edit." />

                {(company.job_title || company.salary) && (
                  <Card>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Position (from employer)</p>
                    {company.job_title       && <RRow label="Job title"       value={company.job_title} />}
                    {company.department && <RRow label="Department"      value={company.department} />}
                    {company.branch_name     && <RRow label="Branch"          value={company.branch_name} />}
                    {company.employment_type && <RRow label="Employment type" value={company.employment_type} />}
                    {company.start_date      && <RRow label="Start date"      value={new Date(company.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} />}
                    {company.salary   && <RRow label="Salary"          value={`${company.salary_currency ?? ''} ${Number(company.salary).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />}
                  </Card>
                )}

                {[
                  {
                    title: 'Personal', editStep: 2,
                    rows: [
                      ['Full name',      `${form.first_name} ${form.last_name}`],
                      ['Email',          form.email],
                      ['Phone',          form.phone],
                      ['Date of birth',  form.date_of_birth],
                      ['Gender',         form.gender],
                      ['Nationality',    form.nationality],
                      ['Marital status', form.marital_status],
                    ],
                  },
                  {
                    title: 'Address', editStep: 3,
                    rows: [
                      ['Street',  form.address_street],
                      ['City',    form.address_city],
                      ['State',   form.address_state],
                      ['Country', form.address_country],
                      ['Postal',  form.address_postal_code],
                    ],
                  },
                  {
                    title: 'Identity', editStep: 4,
                    rows: [
                      ['ID type',   form.gov_id_type],
                      ['ID number', form.gov_id_number],
                      ['Tax ID',    form.tax_id],
                    ],
                  },
                  {
                    title: 'Payment', editStep: 5,
                    rows: [
                      ['Bank',           form.bank_name],
                      ['Account name',   form.bank_account_name],
                      ['Account number', form.bank_account_number],
                      ['Wallet',         form.wallet_address || 'Not provided'],
                    ],
                  },
                  {
                    title: 'Emergency contact', editStep: 6,
                    rows: [
                      ['Name',         form.emergency_contact_name],
                      ['Phone',        form.emergency_contact_phone],
                      ['Relationship', form.emergency_contact_relationship],
                      ['Next of kin',  form.next_of_kin_name ? `${form.next_of_kin_name} (${form.next_of_kin_relationship})` : ''],
                    ],
                  },
                  ...(form.linkedin_url || form.availability_date || form.referred_by ? [{
                    title: 'Other', editStep: 7,
                    rows: [
                      ['LinkedIn',       form.linkedin_url],
                      ['Available from', form.availability_date],
                      ['Referral',       form.referred_by],
                    ],
                  }] : []),
                ].map(section => (
                  <Card key={section.title}>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{section.title}</p>
                      <button onClick={() => setStep(section.editStep)} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
                    </div>
                    {section.rows.filter(([, v]) => v).map(([label, value]) => (
                      <RRow key={label} label={label} value={value} />
                    ))}
                  </Card>
                ))}

                {submitError && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-800 font-medium">{submitError}</p>
                  </div>
                )}

                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-center px-4">
                  By submitting, you confirm all information is accurate. Your data is stored securely and used only for employment purposes at {company.company_name}.
                </p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Validation error */}
        <AnimatePresence>
          {stepError && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-5 flex items-center gap-3 p-3.5 bg-red-50 border border-red-100 rounded-xl"
            >
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs font-black text-red-700">{stepError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav buttons — hidden on step 1 (offer page has its own CTAs) */}
        {step > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-5 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>

            {step < STEPS.length ? (
              <button
                onClick={goNext}
                className="flex items-center gap-2 px-7 py-3 bg-zinc-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
              >
                Continue <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit} disabled={submitting}
                className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  : <><CheckCircle2 className="w-4 h-4" /> Submit onboarding</>
                }
              </button>
            )}
          </div>
        )}

        <p className="text-center text-[10px] text-zinc-300 font-medium mt-6 pb-10">
          Secured · Your data is encrypted end-to-end
        </p>
      </div>
    </div>
  );
}