import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Lock,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const jobs = [
  { title: "3D Designer", status: "ACTIVE", department: "Designer", location: "Unpixel HQ", candidates: 0, created: "3m ago" },
  { title: "UI UX Designer", status: "ACTIVE", department: "Designer", location: "Unpixel HQ", candidates: 10, created: "3m ago" },
  { title: "Senior Android Developer", status: "CLOSED", department: "IT", location: "Unpixel Indonesia", candidates: 115, created: "3m ago" },
  { title: "Senior Android Developer", status: "UNACTIVE", department: "IT", location: "Unpixel Indonesia", candidates: 115, created: "3m ago" },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-hr-teal/15 text-hr-teal",
  CLOSED: "bg-muted text-hr-text-light",
  UNACTIVE: "bg-destructive/15 text-destructive",
};

const statusOptions = ["Active", "Unactive", "Closed"];

const workflowStages = [
  { name: "Applied", locked: true },
  { name: "Screening", locked: false },
  { name: "1st Interview", locked: false },
  { name: "2nd Interview", locked: false },
  { name: "Offered", locked: true },
  { name: "Hired", locked: true },
  { name: "Rejectred", locked: true },
];

const JobsList = () => {
  const navigate = useNavigate();
  const [openStatusIdx, setOpenStatusIdx] = useState<number | null>(null);
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJobStep, setNewJobStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Step 1 fields
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [department, setDepartment] = useState("");
  const [office, setOffice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [description, setDescription] = useState("");

  // Step 2 fields
  const [memberSearch, setMemberSearch] = useState("");

  const handleCreateJob = () => {
    setShowNewJob(false);
    setShowSuccess(true);
    setNewJobStep(1);
  };

  return (
    <SidebarLayout>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Recruitment</h1>
            <p className="text-sm text-hr-text-light">Here's all job list</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Input placeholder="Search what you need" className="pr-10 focus-visible:ring-hr-teal" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
            </div>
            <button
              onClick={() => { setShowNewJob(true); setNewJobStep(1); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 cursor-pointer hover:border-hr-teal/30 transition-colors"
              onClick={() => navigate(`/recruitment/jobs/${i}`)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                    <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-semibold", statusColors[job.status])}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-hr-text-light mb-1">{job.department} . {job.location}</p>
                  <div className="flex items-center gap-2">
                    {job.candidates > 0 && (
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-hr-teal/20 border-2 border-card" />
                        <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-card" />
                      </div>
                    )}
                    <span className="text-sm text-hr-text-light">{job.candidates} Candidates Applied</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpenStatusIdx(openStatusIdx === i ? null : i); }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-sm text-hr-text hover:bg-muted"
                    >
                      {job.status === "ACTIVE" ? "Active" : job.status === "CLOSED" ? "Closed" : "Unactive"}
                      {openStatusIdx === i ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {openStatusIdx === i && (
                      <div className="absolute right-0 top-full mt-1 z-10 bg-card border border-border rounded-xl shadow-lg py-2 w-40">
                        <p className="px-3 py-1.5 text-xs font-semibold text-hr-text-light">Change Status</p>
                        {statusOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={(e) => { e.stopPropagation(); setOpenStatusIdx(null); }}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-muted"
                          >
                            {opt}
                            {opt.toUpperCase() === job.status && <Check className="w-4 h-4 text-hr-teal" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={(e) => e.stopPropagation()} className="text-hr-text-light hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-hr-text-light">Created {job.created}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create New Job Slide-over */}
      {showNewJob && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNewJob(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-50 flex flex-col shadow-xl overflow-y-auto">
            <div className="p-8 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Create New Job</h2>
                <span className="text-sm text-hr-text-light">STEP {newJobStep} OF 2</span>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", newJobStep >= 1 ? "bg-hr-teal text-white" : "bg-muted text-hr-text-light")}>1</div>
                  <span className="text-sm font-medium text-foreground">Job Info</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", newJobStep >= 2 ? "bg-hr-teal text-white" : "bg-muted text-hr-text-light")}>2</div>
                  <span className="text-sm font-medium text-foreground">Hiring Team & Workflow</span>
                </div>
              </div>

              {newJobStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Job Title <span className="text-destructive">*</span></label>
                    <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job title" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Employment Type <span className="text-destructive">*</span></label>
                      <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option value="">Select type</option>
                        <option>Fulltime</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Department <span className="text-destructive">*</span></label>
                      <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option value="">Select department</option>
                        <option>Designer</option>
                        <option>IT</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Office <span className="text-destructive">*</span></label>
                      <select value={office} onChange={(e) => setOffice(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option value="">Select office</option>
                        <option>Unpixel Office</option>
                        <option>Unpixel HQ</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Quantity <span className="text-destructive">*</span></label>
                      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" type="number" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Expected Closing Date</label>
                      <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <input value={closingDate} onChange={(e) => setClosingDate(e.target.value)} placeholder="Select Date" className="bg-transparent flex-1 focus:outline-none text-sm" />
                        <CalendarDays className="w-4 h-4 text-hr-text-light" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Description <span className="text-destructive">*</span></label>
                    <div className="border border-border rounded-xl overflow-hidden">
                      <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
                        {["B", "I", "U", "😊", "🔗", "≡", "≡"].map((icon, idx) => (
                          <button key={idx} className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted text-sm font-bold">{icon}</button>
                        ))}
                      </div>
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job description" className="w-full p-3 text-sm focus:outline-none resize-none min-h-[120px] bg-background" />
                    </div>
                  </div>
                </div>
              )}

              {newJobStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-3">Invite Member</h3>
                    <div className="relative mb-3">
                      <input value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} placeholder="Search name or email address" className="w-full h-10 rounded-lg border border-border bg-background pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal">PC</div>
                        <div>
                          <span className="text-sm font-medium text-foreground">Pristia Candra</span>{" "}
                          <span className="text-sm text-hr-text-light">calzoni@gmail.com</span>
                        </div>
                      </div>
                      <button className="text-hr-text-light hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-bold text-foreground">Hiring Workflow</h3>
                      <button className="text-hr-text-light hover:text-foreground"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-0">
                      {workflowStages.map((stage, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3 border border-border border-b-0 last:border-b first:rounded-t-xl last:rounded-b-xl">
                          <div className="flex items-center gap-3">
                            {stage.locked ? (
                              <Lock className="w-4 h-4 text-hr-text-light" />
                            ) : (
                              <GripVertical className="w-4 h-4 text-hr-text-light" />
                            )}
                            <span className="text-sm text-foreground">{stage.name}</span>
                          </div>
                          {!stage.locked && (
                            <button className="text-hr-text-light hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => {
                  if (newJobStep === 1) setShowNewJob(false);
                  else setNewJobStep(1);
                }}
                className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (newJobStep === 1) setNewJobStep(2);
                  else handleCreateJob();
                }}
                className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Success Dialog */}
      {showSuccess && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowSuccess(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-card rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-hr-teal/10 flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-hr-teal flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  {/* Confetti dots */}
                  <span className="absolute top-1 right-3 text-lg">✦</span>
                  <span className="absolute top-4 left-2 text-sm text-orange-400">✦</span>
                  <span className="absolute bottom-2 left-4 text-sm text-hr-teal">〰</span>
                  <span className="absolute bottom-0 right-2 text-sm text-blue-400">✦</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Add Job Success!</h2>
              <p className="text-sm text-hr-text-light mb-6">New job has been successfully created, stay tuned!</p>
              <button onClick={() => setShowSuccess(false)} className="w-full py-3 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
                Check Now
              </button>
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default JobsList;
