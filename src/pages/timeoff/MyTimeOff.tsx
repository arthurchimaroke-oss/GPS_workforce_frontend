import { useState } from "react";
import EmployeeSidebarLayout from "@/components/layout/EmployeeSidebarLayout";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Info,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

const leaveTypes = [
  { name: "Annual", days: "3 Days" },
  { name: "Engagement", days: "3 Days" },
  { name: "Sick Leave", days: "1 Days" },
  { name: "Wedding", days: "3 Days" },
];

const requests = [
  { from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
  { from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
  { from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
];

const balanceHistory = [
  { date: "01 Mar 2023", event: "Take Time Off", type: "Engagement", changedBy: "Pixel Office", changedByInitials: "PO", change: "-10 Days" },
];

const MyTimeOff = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [dayType, setDayType] = useState<"single" | "multiple">("multiple");
  const [noteText, setNoteText] = useState("");

  return (
    <EmployeeSidebarLayout>
      <div>
        {/* Leave type cards carousel */}
        <div className="flex items-center gap-3 mb-8">
          <button className="text-hr-text-light hover:text-foreground flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-3 overflow-x-auto flex-1">
            {leaveTypes.map((type) => (
              <div key={type.name} className="bg-card border border-border rounded-xl p-4 min-w-[200px] flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{type.name}</h3>
                  <Info className="w-4 h-4 text-hr-text-light" />
                </div>
                <p className="text-sm text-hr-text-light">{type.days}</p>
              </div>
            ))}
          </div>
          <button className="text-hr-text-light hover:text-foreground flex-shrink-0">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Request Time List */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-foreground">Request Time List</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">
              <CalendarDays className="w-4 h-4" />
              Sync With Google
            </button>
            <button
              onClick={() => setShowNewRequest(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90"
            >
              <Plus className="w-4 h-4" />
              Add New Request
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <span>01 Jan 2023 - 10 Mar 2023</span>
            <CalendarDays className="w-4 h-4 text-hr-text-light ml-auto" />
          </div>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Type</option>
          </select>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Status</option>
          </select>
        </div>

        {/* Request table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-hr-text-light">
                  <th className="text-left py-3 px-4 font-medium">From ↕</th>
                  <th className="text-left py-3 px-4 font-medium">To ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Total ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Type ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Attachment ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-hr-text">{req.from}</td>
                    <td className="py-3 px-4 text-hr-text">{req.to}</td>
                    <td className="py-3 px-4 text-hr-text">{req.total}</td>
                    <td className="py-3 px-4 text-hr-text">{req.type}</td>
                    <td className="py-3 px-4 text-hr-text">{req.attachment}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-hr-teal/15 text-hr-teal">
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setShowDetail(true)} className="w-7 h-7 rounded-lg bg-hr-teal/15 flex items-center justify-center text-hr-teal hover:opacity-80">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 hover:opacity-80">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-destructive/15 flex items-center justify-center text-destructive hover:opacity-80">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-1 py-3 border-t border-border">
            <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium bg-hr-navy text-white">1</button>
            <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Balance History */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-bold text-foreground">Balance History</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                <span>01 Jan 2023 - 10 Mar 2023</span>
                <CalendarDays className="w-4 h-4 text-hr-text-light ml-auto" />
              </div>
              <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                <option>All Type</option>
              </select>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-hr-text-light">
                  <th className="text-left py-3 px-4 font-medium">Date ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Event ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Type ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Changed By ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Change (Days) ↕</th>
                </tr>
              </thead>
              <tbody>
                {balanceHistory.map((item, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-hr-text">{item.date}</td>
                    <td className="py-3 px-4 text-hr-text">{item.event}</td>
                    <td className="py-3 px-4 text-hr-text">{item.type}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-hr-teal/20 flex items-center justify-center text-[10px] font-semibold text-hr-teal">
                          {item.changedByInitials}
                        </div>
                        <span className="text-hr-text">{item.changedBy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{item.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Time Off Slide-over */}
      {showDetail && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowDetail(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Detail Time Off</h2>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-100 text-yellow-700">PENDING</span>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-hr-text-light mb-1">From</p><p className="font-medium text-foreground">01 Mar 2023</p></div>
                  <div><p className="text-sm text-hr-text-light mb-1">To</p><p className="font-medium text-foreground">01 Jan 2023</p></div>
                </div>
                <div><p className="text-sm text-hr-text-light mb-1">Total</p><p className="font-medium text-foreground">3 Days</p></div>
                <div><p className="text-sm text-hr-text-light mb-1">Type</p><p className="font-medium text-foreground">Engagement</p></div>
                <div>
                  <p className="text-sm text-hr-text-light mb-1">Attachment</p>
                  <p className="text-hr-text mb-2">-</p>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text-light">
                    Upload attachment
                    <Upload className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-hr-text-light mt-1">Max file size : 5MB. File format : pdf, docx, png, and jpeg</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-6 border-t border-border">
              <button onClick={() => setShowDetail(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel Request</button>
              <button className="flex-1 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90">Edit</button>
            </div>
            <button className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {/* Add New Time Off Slide-over */}
      {showNewRequest && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNewRequest(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Add New Time Off</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Time Off Type <span className="text-destructive">*</span></label>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text-light">
                    Select date
                    <CalendarDays className="w-4 h-4" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDayType("single")}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium",
                      dayType === "single" ? "border-hr-teal bg-hr-teal-light" : "border-border"
                    )}
                  >
                    Single Day
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", dayType === "single" ? "border-hr-teal" : "border-hr-gray")}>
                      {dayType === "single" && <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />}
                    </div>
                  </button>
                  <button
                    onClick={() => setDayType("multiple")}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium",
                      dayType === "multiple" ? "border-hr-teal bg-hr-teal-light" : "border-border"
                    )}
                  >
                    Multiple Day
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", dayType === "multiple" ? "border-hr-teal" : "border-hr-gray")}>
                      {dayType === "multiple" && <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />}
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text-light">
                    Select Date
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text-light">
                    Select Date
                    <CalendarDays className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Note</label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Give notes"
                    className="w-full h-20 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Attachment</label>
                  <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text-light">
                    Upload attachment
                    <Upload className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-hr-text-light mt-1">Max file size : 5MB. File format : pdf, docx, png, and jpeg</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Assign To</label>
                  <div className="relative">
                    <Input placeholder="Search member name" className="pr-10 focus-visible:ring-hr-teal" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-6 border-t border-border">
              <button onClick={() => setShowNewRequest(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
              <button className="flex-1 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90">Create</button>
            </div>
            <button className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </EmployeeSidebarLayout>
  );
};

export default MyTimeOff;
