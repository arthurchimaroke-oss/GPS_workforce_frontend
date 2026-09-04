import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const candidates = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", initials: "PC", phone: "08092139441", job: "Designer", cv: "CV.pdf", date: "01 Mar 2023", stage: "Applied" },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", initials: "HB", phone: "08092139441", job: "Designer", cv: "-", date: "01 Mar 2023", stage: "Screening" },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", initials: "MG", phone: "08092139441", job: "Designer", cv: "CV.pdf", date: "01 Mar 2023", stage: "1st Interview" },
  { name: "Rayna Torff", email: "rayna@unpixel.com", initials: "RT", phone: "08092139441", job: "Designer", cv: "-", date: "01 Mar 2023", stage: "2nd Interview" },
  { name: "Giana Lipshutz", email: "giana@unpixel.com", initials: "GL", phone: "08092139441", job: "Designer", cv: "-", date: "01 Mar 2023", stage: "Hiring" },
  { name: "James George", email: "james@unpixel.com", initials: "JG", phone: "08092139441", job: "Designer", cv: "CV.pdf", date: "01 Mar 2023", stage: "Hiring" },
  { name: "Jordyn George", email: "jordyn@unpixel.com", initials: "JG", phone: "08092139441", job: "Designer", cv: "CV.pdf", date: "01 Mar 2023", stage: "Rejected" },
  { name: "Skylar Herwitz", email: "skylar@unpixel.com", initials: "SH", phone: "08092139441", job: "Designer", cv: "CV.pdf", date: "01 Mar 2023", stage: "Screening" },
];

const CandidatesList = () => {
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [addDropdown, setAddDropdown] = useState(false);

  // Add candidate form
  const [firstName, setFirstName] = useState("Pristia");
  const [lastName, setLastName] = useState("Candra");
  const [emailAddr, setEmailAddr] = useState("Pristia");
  const [phoneNum, setPhoneNum] = useState("+62");
  const [selectedJob, setSelectedJob] = useState("");
  const [source, setSource] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  return (
    <SidebarLayout>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Candidates</h1>
            <p className="text-sm text-hr-text-light">This is the data of all candidates who applied</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Input placeholder="Search what you need" className="pr-10 focus-visible:ring-hr-teal" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
            </div>
            <div className="relative">
              <button
                onClick={() => setAddDropdown(!addDropdown)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90"
              >
                Add Candidates <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {addDropdown && (
                <div className="absolute right-0 top-full mt-1 z-10 bg-card border border-border rounded-xl shadow-lg py-2 w-48">
                  <button onClick={() => { setShowAddCandidate(true); setAddDropdown(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-muted">Add Manually</button>
                  <button onClick={() => { setShowBulkUpload(true); setAddDropdown(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-muted">Bulk Upload CV</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm text-hr-text">
            <span>01 Jan 2023 - 10 Mar 2023</span>
            <CalendarDays className="w-4 h-4 text-hr-text-light" />
          </div>
          {["All Record", "All Location", "All Status"].map((filter) => (
            <select key={filter} className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
              <option>{filter}</option>
            </select>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-hr-text-light">
                  <th className="text-left py-3 px-4 font-medium">Name ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Phone Number ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Job ↕</th>
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
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal flex-shrink-0">{c.initials}</div>
                        <div>
                          <p className="font-medium text-foreground">{c.name}</p>
                          <p className="text-xs text-hr-text-light">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{c.phone}</td>
                    <td className="py-3 px-4 text-hr-text">{c.job}</td>
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
      </div>

      {/* Add Candidate Slide-over */}
      {showAddCandidate && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddCandidate(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-50 flex flex-col shadow-xl overflow-y-auto">
            <div className="p-8 flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">New Candidate</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Upload CV</label>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text cursor-pointer">
                    <span>Upload File</span>
                    <Upload className="w-4 h-4 text-hr-text-light" />
                  </div>
                  <p className="text-xs text-hr-text-light mt-1">Max file size : 5MB. File format : pdf, docx, png, and jpeg</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Photo</label>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text cursor-pointer">
                    <span>Upload Photo</span>
                    <Upload className="w-4 h-4 text-hr-text-light" />
                  </div>
                  <p className="text-xs text-hr-text-light mt-1">Max file size : 5MB. File format : pdf, docx, png, and jpeg</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Attachment</label>
                <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text cursor-pointer">
                  <span>Upload attachment</span>
                  <Upload className="w-4 h-4 text-hr-text-light" />
                </div>
                <p className="text-xs text-hr-text-light mt-1">Max file size : 5MB. File format : pdf, docx, png, and jpeg</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">First Name <span className="text-destructive">*</span></label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name <span className="text-destructive">*</span></label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address <span className="text-destructive">*</span></label>
                  <input value={emailAddr} onChange={(e) => setEmailAddr(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number <span className="text-destructive">*</span></label>
                  <input value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Job</label>
                  <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                    <option value="">Select job</option>
                    <option>Designer</option>
                    <option>Developer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Source</label>
                  <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                    <option value="">Add source</option>
                    <option>LinkedIn</option>
                    <option>Referral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Cover Letter</label>
                <input value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Input cover letter" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowAddCandidate(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted">Cancel</button>
              <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Create</button>
            </div>
          </div>
        </>
      )}

      {/* Bulk Upload CV Slide-over */}
      {showBulkUpload && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowBulkUpload(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-50 flex flex-col shadow-xl overflow-y-auto">
            <div className="p-8 flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">Upload CV</h2>

              <label className="text-sm font-medium text-foreground mb-1.5 block">CV/Resume <span className="text-destructive">*</span></label>
              <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">📁</div>
                <p className="text-base font-semibold text-foreground mb-1">Drag & Drop here to upload</p>
                <p className="text-sm text-hr-text-light mb-4">Or select file from your computer</p>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
                  <Upload className="w-4 h-4" /> Upload File
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowBulkUpload(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted">Cancel</button>
              <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Create</button>
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default CandidatesList;
