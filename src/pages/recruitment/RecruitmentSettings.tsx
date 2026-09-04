import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  GripVertical,
  Lock,
  Mail,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Users,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const workflowStages = [
  { name: "Applied", locked: true },
  { name: "Screening", locked: false },
  { name: "1st Interview", locked: false },
  { name: "2nd Interview", locked: false },
  { name: "Offered", locked: true },
  { name: "Hired", locked: true },
  { name: "Rejectred", locked: true },
];

const tags = [
  { name: "Design", candidates: 20 },
  { name: "Engineer", candidates: 10 },
  { name: "Finance", candidates: 5 },
  { name: "Product", candidates: 0 },
];

const emailTemplates = [
  { name: "Offer", subject: "Offer from {{company_name}}", stage: "Offered", modified: "13 Jul 2022" },
  { name: "Auto Confirmation", subject: "Thank you for you application at {{company_name}}", stage: "Applied", modified: "1 Apr 2023" },
  { name: "Rejection", subject: "{{job_title}} position at {{company_name}}", stage: "Rejected", modified: "10 Jan 2023" },
];

const subtabOptions = ["Tag", "Resource"] as const;

const RecruitmentSettings = () => {
  const [activeTab, setActiveTab] = useState<"workflow" | "tag" | "email">("workflow");
  const [tagSubTab, setTagSubTab] = useState<"Tag" | "Resource">("Tag");
  const [showEmailDetail, setShowEmailDetail] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);
  const [emailBody, setEmailBody] = useState(`Dear {{candidate_first_name}},

{{company_name}} is excited to bring you on board as {{job_title}}.

You were our best candidates. We were really sold on your [details about the candidate that made them your choice].

{{company_name}} is offering a [full time, part time, etc.] position for you as {{job_title}}, reporting to [immediate manager/supervisor] starting on [proposed start date] at [workplace location]

Best regards,

{{company_name}}`);

  return (
    <SidebarLayout>
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Setting Recruitment</h1>
        <p className="text-sm text-hr-text-light mb-6">
          {activeTab === "workflow" ? "Hiring Workflow Setting" : activeTab === "tag" ? "Tag & Resource" : "Email Template"}
        </p>

        <div className="flex gap-6">
          <div className="w-56 flex-shrink-0 space-y-1">
            <button onClick={() => setActiveTab("workflow")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors", activeTab === "workflow" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50")}>
              <Users className="w-4 h-4" /> Hiring Workflow
            </button>
            <button onClick={() => setActiveTab("tag")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors", activeTab === "tag" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50")}>
              <FileText className="w-4 h-4" /> Tag & Resource
            </button>
            <button onClick={() => setActiveTab("email")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors", activeTab === "email" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50")}>
              <Mail className="w-4 h-4" /> Email Template
            </button>
          </div>

          <div className="flex-1">
            {/* Hiring Workflow */}
            {activeTab === "workflow" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Hiring Workflow</h2>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
                    <Plus className="w-4 h-4" /> New Stage
                  </button>
                </div>
                <div className="space-y-0">
                  {workflowStages.map((stage, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 border border-border border-b-0 last:border-b first:rounded-t-xl last:rounded-b-xl">
                      <div className="flex items-center gap-3">
                        {stage.locked ? <Lock className="w-4 h-4 text-hr-text-light" /> : <GripVertical className="w-4 h-4 text-hr-text-light" />}
                        <span className="text-sm text-foreground">{stage.name}</span>
                      </div>
                      {!stage.locked && <button className="text-hr-text-light hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tag & Resource */}
            {activeTab === "tag" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Tag & Resource</h2>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
                    <Plus className="w-4 h-4" /> New Tag
                  </button>
                </div>
                <div className="flex gap-1 border-b border-border mb-6">
                  {subtabOptions.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTagSubTab(tab)}
                      className={cn(
                        "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
                        tagSubTab === tab ? "border-hr-teal text-hr-teal" : "border-transparent text-hr-text-light hover:text-foreground"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {tags.map((tag) => (
                    <div key={tag.name} className="border border-border rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-foreground">{tag.name}</h3>
                        <p className="text-sm text-hr-text-light">{tag.candidates} Candidates</p>
                      </div>
                      <button className="text-hr-text-light hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Email Template */}
            {activeTab === "email" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Email Template</h2>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
                    <Plus className="w-4 h-4" /> Add Template
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                    <option>All Stages</option>
                  </select>
                  <div className="relative flex-1">
                    <input placeholder="Search what you need" className="w-full h-10 rounded-lg border border-border bg-background pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-hr-text-light">
                      <th className="text-left py-3 px-4 font-medium">Name ↕</th>
                      <th className="text-left py-3 px-4 font-medium">Subject</th>
                      <th className="text-left py-3 px-4 font-medium">Stage</th>
                      <th className="text-left py-3 px-4 font-medium">Last Modified</th>
                      <th className="text-right py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailTemplates.map((t, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-hr-text-light" />
                            <span className="text-foreground">{t.name}</span>
                            <Lock className="w-3 h-3 text-hr-text-light" />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-hr-text">{t.subject}</td>
                        <td className="py-3 px-4 text-hr-text">{t.stage}</td>
                        <td className="py-3 px-4 text-hr-text">{t.modified}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end">
                            <button
                              onClick={() => { setSelectedTemplate(t); setShowEmailDetail(true); }}
                              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:opacity-80"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center gap-1 pt-3">
                  <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium bg-hr-navy text-white">1</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Template Detail Slide-over */}
      {showEmailDetail && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowEmailDetail(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-50 flex flex-col shadow-xl overflow-y-auto">
            <div className="p-8 flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">Detail Email Template</h2>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Stage</label>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                    <span>{selectedTemplate.stage}</span>
                    <Upload className="w-4 h-4 text-hr-text-light" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email Template</label>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                    <span>{selectedTemplate.name}</span>
                    <Upload className="w-4 h-4 text-hr-text-light" />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Subject <span className="text-destructive">*</span></label>
                <input defaultValue={selectedTemplate.subject} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
              </div>

              <div className="border border-border rounded-xl overflow-hidden">
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
              <button onClick={() => setShowEmailDetail(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted">Cancel</button>
              <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Save</button>
            </div>

            <button onClick={() => setShowEmailDetail(false)} className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default RecruitmentSettings;
