import { useState } from "react";
import {
  CalendarDays,
  FileText,
  Info,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PayrollSettings = () => {
  const [activeTab, setActiveTab] = useState<"general" | "payCycle" | "compensation">("general");

  return (
    <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Setting Payroll</h1>
        <p className="text-sm text-hr-text-light mb-6">Setting your payroll</p>

        <div className="flex gap-6">
          <div className="w-56 flex-shrink-0 space-y-1">
            <button onClick={() => setActiveTab("general")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors", activeTab === "general" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50")}>
              <Settings className="w-4 h-4" /> General
            </button>
            <button onClick={() => setActiveTab("payCycle")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors", activeTab === "payCycle" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50")}>
              <FileText className="w-4 h-4" /> Pay Cycle
            </button>
            <button onClick={() => setActiveTab("compensation")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors", activeTab === "compensation" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50")}>
              <FileText className="w-4 h-4" /> Compensation
            </button>
          </div>

          <div className="flex-1">
            {activeTab === "general" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">General</h2>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Currency <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>USD</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Calculate Monthly Salary Based On <span className="text-destructive">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>Fixed Day</option>
                      </select>
                      <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>20 Workout Days</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-hr-text-light">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span>To calculate prorate salaries for employees who join in the middle of your payroll cycle</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payCycle" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">New Pay Cycle</h2>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name <span className="text-destructive">*</span></label>
                    <input defaultValue="Pristia Candra" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Description <span className="text-destructive">*</span></label>
                    <input placeholder="Write description" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Reapet Every <span className="text-destructive">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>1</option>
                      </select>
                      <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Cut-off Date <span className="text-destructive">*</span></label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text flex-1">
                        Select Date
                        <CalendarDays className="w-4 h-4 text-hr-text-light" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-hr-text-light">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <span>This is the latest date that payroll information should be submitted to calculate payroll</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground pt-2">Who's in Charge</h3>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Person in Charge <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>Select Employee</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Review Befor Cut-off Date <span className="text-destructive">*</span></label>
                    <div className="flex items-center gap-3">
                      <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text flex-1">
                        <option>5 Days</option>
                      </select>
                      <div className="flex items-center gap-2 text-sm text-hr-text-light">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <span>Your person in charge will receive a reminder on that day</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground pt-2">Eligibility</h3>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Criteria <span className="text-destructive">*</span></label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>Al Active Employee</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "compensation" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Compensation</h2>
                <p className="text-sm text-hr-text-light">Compensation settings will be available here.</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default PayrollSettings;
