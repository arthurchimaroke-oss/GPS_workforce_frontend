import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  LayoutGrid,
  Link2,
  List,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Smile,
  Trash2,
  X,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const candidates = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", initials: "PC", phone: "08092139441", cv: "CV.pdf", date: "01 Mar 2023", stage: "Applied" },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", initials: "HB", phone: "08092139441", cv: "-", date: "01 Mar 2023", stage: "Screening" },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", initials: "MG", phone: "08092139441", cv: "CV.pdf", date: "01 Mar 2023", stage: "1st Interview" },
  { name: "Rayna Torff", email: "rayna@unpixel.com", initials: "RT", phone: "08092139441", cv: "-", date: "01 Mar 2023", stage: "2nd Interview" },
  { name: "Giana Lipshutz", email: "giana@unpixel.com", initials: "GL", phone: "08092139441", cv: "-", date: "01 Mar 2023", stage: "Hiring" },
  { name: "James George", email: "james@unpixel.com", initials: "JG", phone: "08092139441", cv: "CV.pdf", date: "01 Mar 2023", stage: "Hiring" },
  { name: "Jordyn George", email: "jordyn@unpixel.com", initials: "JG", phone: "08092139441", cv: "CV.pdf", date: "01 Mar 2023", stage: "Rejected" },
  { name: "Skylar Herwitz", email: "skylar@unpixel.com", initials: "SH", phone: "08092139441", cv: "CV.pdf", date: "01 Mar 2023", stage: "Screening" },
];

const pipelineStages = [
  { name: "Applied", count: 2, candidates: [
    { name: "Jennifer Law", email: "jennifer@gmail.com", initials: "JL", messages: 0, tasks: 0 },
    { name: "Gustavo Franci", email: "gustavo@gmail.com", initials: "GF", messages: 0, tasks: 0 },
  ]},
  { name: "Screening", count: 3, candidates: [
    { name: "Skylar Calzoni", email: "calzoni@gmail.com", initials: "SC", messages: 3, tasks: 1 },
    { name: "Alfredo Gouse", email: "alfredo@gmail.com", initials: "AG", messages: 1, tasks: 0 },
    { name: "James Carder", email: "james@gmail.com", initials: "JC", messages: 0, tasks: 2 },
  ]},
  { name: "1st Interview", count: 1, candidates: [
    { name: "Lindsey Westervelt", email: "lindsey@gmail.com", initials: "LW", messages: 0, tasks: 1 },
  ]},
  { name: "2st Interview", count: 2, candidates: [
    { name: "Marilyn M.", email: "jennifer@gmail.com", initials: "MM", messages: 3, tasks: 2 },
    { name: "Carla Le", email: "carla@gmail.com", initials: "CL", messages: 3, tasks: 2 },
  ]},
];

const ratings = [
  { emoji: "😣", label: "Strong No" },
  { emoji: "😐", label: "No" },
  { emoji: "😐", label: "Not Sure" },
  { emoji: "😊", label: "Yes" },
  { emoji: "🤩", label: "Excellent" },
];

const activityLog = [
  {
    user: "Pixel Office",
    initials: "PO",
    action: "moved candidate from stage",
    from: "Rejected",
    to: "Applied",
    time: "1m ago",
  },
  {
    user: "Zoe Alexander",
    initials: "ZA",
    action: "moved candidate from stage",
    from: "Applied",
    to: "Rejected",
    reason: "Spam",
    time: "5m ago",
  },
];

const JobDetail = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"table" | "pipeline">("table");
  const [showProfile, setShowProfile] = useState(false);
  const [profileTab, setProfileTab] = useState<"profile" | "email" | "evaluation" | "comments" | "activity">("evaluation");
  const [selectedRating, setSelectedRating] = useState(3);
  const [evalText, setEvalText] = useState("You are have talented, love your work!");
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState("Auto Confirmation");
  const [emailSubject, setEmailSubject] = useState("Thank you for your application at Pixel Office");
  const [emailBody, setEmailBody] = useState(`Hi Cecilia,

Thank you very much for applying for the Engineering Manager position at Pixel Office.

Please be informed that we have received your application. Our hiring team is currently reviewing all applications. If you are among qualified candidates, you will receive an email notifying you of the next step soon.

Thanks again for your interest in working at our company.

Best regards,

Pixel Office`);

  return (
    <SidebarLayout>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Recruitment</h1>
            <div className="flex items-center gap-2 text-sm text-hr-text-light">
              <button onClick={() => navigate("/recruitment/jobs")} className="hover:text-foreground">List Job</button>
              <span>›</span>
              <span className="text-foreground font-medium">3D Designer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Input placeholder="Search what you need" className="pr-10 focus-visible:ring-hr-teal" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90">
              Add Candidates <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button onClick={() => setViewMode("table")} className={cn("p-2", viewMode === "table" ? "bg-hr-teal text-white" : "bg-background text-hr-text-light")}>
                <List className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("pipeline")} className={cn("p-2", viewMode === "pipeline" ? "bg-hr-teal text-white" : "bg-background text-hr-text-light")}>
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <button className="text-hr-text-light hover:text-foreground"><Link2 className="w-4 h-4" /></button>
            <button className="text-hr-text-light hover:text-foreground"><Clock className="w-4 h-4" /></button>
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-hr-text-light">
                    <th className="text-left py-3 px-4 font-medium">Name ↕</th>
                    <th className="text-left py-3 px-4 font-medium">Phone Number ↕</th>
                    <th className="text-left py-3 px-4 font-medium">CV ↕</th>
                    <th className="text-left py-3 px-4 font-medium">Created Date ↕</th>
                    <th className="text-left py-3 px-4 font-medium">Stages ↕</th>
                    <th className="text-right py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <button onClick={() => setShowProfile(true)} className="flex items-center gap-3 text-left">
                          <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal flex-shrink-0">{c.initials}</div>
                          <div>
                            <p className="font-medium text-foreground">{c.name}</p>
                            <p className="text-xs text-hr-text-light">{c.email}</p>
                          </div>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-hr-text">{c.phone}</td>
                      <td className="py-3 px-4 text-hr-text">
                        {c.cv !== "-" ? (
                          <div className="flex items-center gap-1"><span>{c.cv}</span><FileText className="w-3.5 h-3.5 text-hr-text-light" /></div>
                        ) : "-"}
                      </td>
                      <td className="py-3 px-4 text-hr-text">{c.date}</td>
                      <td className="py-3 px-4 text-hr-text">
                        <div className="flex items-center gap-1">{c.stage} <ChevronDown className="w-3.5 h-3.5 text-hr-text-light" /></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:opacity-80"><Pencil className="w-3.5 h-3.5" /></button>
                          <button className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-white hover:opacity-80"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium bg-hr-navy text-white">1</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-2 text-sm text-hr-text-light">
                <span>Showing 1 to 8 of 8 entries</span>
                <span className="font-medium text-foreground">Show 8 ▴</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {pipelineStages.map((stage) => (
              <div key={stage.name} className="min-w-[280px] flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground">{stage.name}</h3>
                    <span className="w-5 h-5 rounded-full bg-hr-teal text-white text-[10px] font-bold flex items-center justify-center">{stage.count}</span>
                  </div>
                  <button className="text-hr-text-light hover:text-foreground"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3">
                  {stage.candidates.map((c, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowProfile(true)}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal">{c.initials}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.name}</p>
                          <p className="text-xs text-hr-text-light">{c.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-hr-text-light">
                          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {c.messages}</span>
                          <span className="flex items-center gap-1"><Smile className="w-3 h-3" /> {c.tasks}</span>
                        </div>
                        <button className="text-hr-text-light hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Candidate Profile Slide-over */}
      {showProfile && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => { setShowProfile(false); setShowSendEmail(false); }} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-50 flex flex-col shadow-xl overflow-y-auto">
            {!showSendEmail ? (
              <>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full bg-hr-teal/20 flex items-center justify-center text-2xl font-bold text-hr-teal">PC</div>
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-foreground">Pristia Candra</h2>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-muted text-hr-text-light">APPLIED</span>
                      </div>
                      <p className="text-sm text-hr-text-light mb-2">3D Designer</p>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2 text-hr-text"><Mail className="w-3.5 h-3.5" /> pristia@gmail.com</p>
                        <p className="flex items-center gap-2 text-hr-text"><Phone className="w-3.5 h-3.5" /> 089318298493</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-sm text-hr-text hover:bg-muted">
                      Move To <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex gap-1 border-b border-border mb-6">
                    {(["profile", "email", "evaluation", "comments", "activity"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setProfileTab(tab)}
                        className={cn(
                          "px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors -mb-px",
                          profileTab === tab ? "border-hr-teal text-hr-teal" : "border-transparent text-hr-text-light hover:text-foreground"
                        )}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {profileTab === "evaluation" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-foreground">Overall Rating</h3>
                        <button className="text-hr-text-light hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                      </div>
                      <div className="flex gap-2 mb-6">
                        {ratings.map((r, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedRating(i)}
                            className={cn(
                              "flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border text-sm transition-colors",
                              selectedRating === i ? "border-hr-teal bg-hr-teal/5" : "border-border hover:bg-muted"
                            )}
                          >
                            <span className="text-2xl">{r.emoji}</span>
                            <span className="text-xs font-medium text-hr-text">{r.label}</span>
                            {selectedRating === i && <span className="text-hr-teal text-xs">✓</span>}
                          </button>
                        ))}
                      </div>
                      <div className="border border-border rounded-xl overflow-hidden">
                        <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
                          {["B", "I", "U", "😊", "🔗", "≡", "≡"].map((icon, i) => (
                            <button key={i} className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted text-sm font-bold">{icon}</button>
                          ))}
                        </div>
                        <textarea value={evalText} onChange={(e) => setEvalText(e.target.value)} className="w-full p-3 text-sm focus:outline-none resize-none min-h-[80px] bg-background" />
                      </div>
                    </div>
                  )}

                  {profileTab === "email" && (
                    <div>
                      <button
                        onClick={() => setShowSendEmail(true)}
                        className="px-5 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90"
                      >
                        Send Email
                      </button>
                    </div>
                  )}

                  {profileTab === "activity" && (
                    <div className="space-y-4">
                      {activityLog.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-hr-text flex-shrink-0">
                            {item.initials}
                          </div>
                          <div>
                            <p className="text-sm text-foreground">
                              <span className="font-semibold">{item.user}</span>{" "}
                              {item.action}{" "}
                              <span className="font-bold">{item.from}</span> to{" "}
                              <span className="font-bold">{item.to}</span>
                            </p>
                            {item.reason && (
                              <p className="text-sm text-hr-text">
                                Reason <span className="font-semibold">{item.reason}</span>
                              </p>
                            )}
                            <p className="text-xs text-hr-text-light">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {profileTab === "profile" && (
                    <p className="text-sm text-hr-text-light">Profile details will appear here.</p>
                  )}
                  {profileTab === "comments" && (
                    <p className="text-sm text-hr-text-light">Comments will appear here.</p>
                  )}
                </div>

                <div className="mt-auto p-6 border-t border-border flex justify-end">
                  <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Submit</button>
                </div>
              </>
            ) : (
              /* Send Email View */
              <div className="flex flex-col h-full">
                <div className="p-8 flex-1 overflow-y-auto">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send Email to Candidate</h2>

                  <div className="mb-5">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email Template <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={emailTemplate}
                      onChange={(e) => setEmailTemplate(e.target.value)}
                      className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
                    >
                      <option>Auto Confirmation</option>
                      <option>Interview Invite</option>
                      <option>Rejection</option>
                    </select>
                  </div>

                  <div className="border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                      <span className="text-sm text-hr-text-light">To</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-hr-teal/20 flex items-center justify-center text-[10px] font-semibold text-hr-teal">PC</div>
                        <span className="text-sm font-medium text-foreground">Pristia Candra</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                      <span className="text-sm text-hr-text-light">Subject :</span>
                      <input
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="flex-1 text-sm bg-transparent focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
                      {["B", "I", "U", "😊", "🔗", "≡", "≡"].map((icon, i) => (
                        <button key={i} className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted text-sm font-bold">{icon}</button>
                      ))}
                    </div>

                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full p-4 text-sm focus:outline-none resize-none min-h-[250px] bg-background"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-border flex justify-end gap-3">
                  <button
                    onClick={() => setShowSendEmail(false)}
                    className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted"
                  >
                    Back
                  </button>
                  <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
                    Create
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => { setShowProfile(false); setShowSendEmail(false); }}
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default JobDetail;
