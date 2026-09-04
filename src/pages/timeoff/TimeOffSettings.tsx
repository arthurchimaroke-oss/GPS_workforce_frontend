import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {
  CalendarDays,
  FileText,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const holidays = [
  { name: "New Year's Day", date: "01 Jan 2023" },
  { name: "Lunar New Year's Day", date: "22 Jan 2023" },
  { name: "Lunar New Year Joint Holiday", date: "23 Jan 2023" },
  { name: "Ascension of the Prophet Muhammad", date: "18 Feb 2023" },
  { name: "Bali's Day of Silence and Hindu New Year (Nyepi)", date: "22 Mar 2023" },
  { name: "Joint Holiday for Bali's Day of Silence and Hindu New Year (Nyepi)", date: "23 Mar 2023" },
  { name: "Ramadan Start", date: "23 Mar 2023" },
  { name: "Good Friday", date: "07 Apr 2023" },
  { name: "Easter Sunday", date: "09 Apr 2023" },
];

const typesPolicies = [
  {
    name: "Annual",
    badge: "UNPAID",
    policies: [{ name: "Annual", description: "-", eligibility: "Full-time Employees only" }],
  },
  {
    name: "Engagement",
    badge: "UNPAID",
    policies: [{ name: "Engagement", description: "-", eligibility: "Full-time Employees only" }],
  },
  {
    name: "Maternity",
    badge: "UNPAID",
    policies: [{ name: "Maternity", description: "-", eligibility: "All full-time female employees" }],
  },
];

const TimeOffSettings = () => {
  const [activeTab, setActiveTab] = useState<"holiday" | "types">("holiday");
  const [showNewHoliday, setShowNewHoliday] = useState(false);
  const [showNewType, setShowNewType] = useState(false);
  const [showNewPolicy, setShowNewPolicy] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [paidType, setPaidType] = useState<"paid" | "unpaid">("unpaid");
  const [policyName, setPolicyName] = useState("");

  return (
    <SidebarLayout>
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Setting Time Off</h1>
        <p className="text-sm text-hr-text-light mb-6">Setting your Time off here</p>

        <div className="flex gap-6">
          {/* Left sidebar tabs */}
          <div className="w-56 flex-shrink-0 space-y-1">
            <button
              onClick={() => setActiveTab("holiday")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                activeTab === "holiday" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50"
              )}
            >
              <CalendarDays className="w-4 h-4" />
              Holiday
            </button>
            <button
              onClick={() => setActiveTab("types")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                activeTab === "types" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50"
              )}
            >
              <FileText className="w-4 h-4" />
              Types & Policies
            </button>
          </div>

          {/* Right content */}
          <div className="flex-1">
            {activeTab === "holiday" ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Holidays</h2>
                  <button
                    onClick={() => setShowNewHoliday(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    New Holiday
                  </button>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-hr-text-light">
                        <th className="text-left py-3 px-4 font-medium">Holiday Name ↕</th>
                        <th className="text-left py-3 px-4 font-medium">Datet ↕</th>
                        <th className="text-right py-3 px-4 font-medium">From</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holidays.map((h, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4 text-foreground">{h.name}</td>
                          <td className="py-3 px-4 text-hr-text">{h.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:opacity-80">
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-white hover:opacity-80">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Types and Policies</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowNewType(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted"
                    >
                      <Plus className="w-4 h-4" />
                      New Type
                    </button>
                    <button
                      onClick={() => setShowNewPolicy(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90"
                    >
                      <Plus className="w-4 h-4" />
                      New Policy
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {typesPolicies.map((type) => (
                    <div key={type.name} className="bg-card border border-border rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-foreground">{type.name}</h3>
                          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-muted text-hr-text-light">{type.badge}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-6 rounded-full bg-hr-teal flex items-center justify-end p-0.5">
                            <div className="w-5 h-5 rounded-full bg-white" />
                          </div>
                          <button className="text-hr-text-light hover:text-foreground">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-hr-text-light">
                            <th className="text-left py-3 px-5 font-medium">Policy Name</th>
                            <th className="text-left py-3 px-5 font-medium">Description</th>
                            <th className="text-left py-3 px-5 font-medium">Eligibility</th>
                            <th className="text-right py-3 px-5 font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {type.policies.map((p, i) => (
                            <tr key={i} className="border-b border-border last:border-0">
                              <td className="py-3 px-5 text-foreground">{p.name}</td>
                              <td className="py-3 px-5 text-hr-text">{p.description}</td>
                              <td className="py-3 px-5 text-hr-text">{p.eligibility}</td>
                              <td className="py-3 px-5 text-right">
                                <button className="w-8 h-8 rounded-full bg-hr-teal flex items-center justify-center text-white hover:opacity-80">
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Holiday Slide-over */}
      {showNewHoliday && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNewHoliday(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">New Holiday</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Holiday Name <span className="text-destructive">*</span></label>
                  <input
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    placeholder="Eid Mubarak"
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">From <span className="text-destructive">*</span></label>
                    <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      19 Apr 2023
                      <CalendarDays className="w-4 h-4 text-hr-text-light" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">To <span className="text-destructive">*</span></label>
                    <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      24 Apr 2023
                      <CalendarDays className="w-4 h-4 text-hr-text-light" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-6 border-t border-border">
              <button onClick={() => setShowNewHoliday(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
              <button className="flex-1 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Add</button>
            </div>
            <button className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {/* Add Type Slide-over */}
      {showNewType && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNewType(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Add Type</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Type Name <span className="text-destructive">*</span></label>
                  <input
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    placeholder="Engagement"
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Paid/Unpaid <span className="text-destructive">*</span></label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaidType("paid")}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium",
                        paidType === "paid" ? "border-hr-teal bg-hr-teal-light" : "border-border"
                      )}
                    >
                      Paid
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paidType === "paid" ? "border-hr-teal" : "border-hr-gray")}>
                        {paidType === "paid" && <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />}
                      </div>
                    </button>
                    <button
                      onClick={() => setPaidType("unpaid")}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium",
                        paidType === "unpaid" ? "border-hr-teal bg-hr-teal-light" : "border-border"
                      )}
                    >
                      Unpaid
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paidType === "unpaid" ? "border-hr-teal" : "border-hr-gray")}>
                        {paidType === "unpaid" && <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />}
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Unit <span className="text-destructive">*</span></label>
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-hr-teal bg-hr-teal-light text-sm font-medium">
                    Days
                    <div className="w-5 h-5 rounded-full border-2 border-hr-teal flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-6 border-t border-border">
              <button onClick={() => setShowNewType(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
              <button className="flex-1 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Add</button>
            </div>
            <button className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {/* Create Policy Slide-over */}
      {showNewPolicy && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNewPolicy(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-50 flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Create Policy</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Policy Name <span className="text-destructive">*</span></label>
                    <input
                      value={policyName}
                      onChange={(e) => setPolicyName(e.target.value)}
                      placeholder="Annual"
                      className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Type <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>Select Type</option>
                      <option>Annual</option>
                      <option>Engagement</option>
                      <option>Maternity</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Description <span className="text-destructive">*</span></label>
                  <input
                    placeholder="Input description about policy"
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal"
                  />
                </div>

                <h3 className="text-base font-bold text-foreground pt-2">Accrual</h3>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Assign Date <span className="text-destructive">*</span></label>
                  <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                    <option>Upon join date</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Accrual Frequency <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Entitlement <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>3 (Days per year)</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground pt-2">Carry Over</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Maximum Carry Over <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>3 (Days per year)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Carry Over Expiration <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>Dec</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">&nbsp;</label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>31</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground pt-2">Duration Allowed</h3>
                <div className="border border-hr-teal rounded-xl p-4 bg-hr-teal-light">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Hourly</p>
                      <p className="text-xs text-hr-text-light">Employee can book time off by hours which will be calculated to days based on standard working hours. Ex: Standard working hours = 8 hours/day, 3 hours off = 0.375 days</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-hr-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-6 border-t border-border">
              <button className="text-sm font-medium text-hr-teal hover:underline mr-auto">Save & Assign Employee</button>
              <button onClick={() => setShowNewPolicy(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
              <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Create</button>
            </div>
            <button className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default TimeOffSettings;
