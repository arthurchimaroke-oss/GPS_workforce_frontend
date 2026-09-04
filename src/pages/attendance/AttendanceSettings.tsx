import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {
  CalendarDays,
  Globe,
  List,
  MoreVertical,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AttendanceSettings = () => {
  const [activeTab, setActiveTab] = useState<"general" | "location" | "qr">("general");

  return (
    <SidebarLayout>
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Setting Attendance</h1>
        <p className="text-sm text-hr-text-light mb-6">Setting your Attendance</p>

        <div className="flex gap-6">
          {/* Left sidebar tabs */}
          <div className="w-56 flex-shrink-0 space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                activeTab === "general" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50"
              )}
            >
              <Settings className="w-4 h-4" />
              General
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                activeTab === "location" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50"
              )}
            >
              <Globe className="w-4 h-4" />
              Location & Policy
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                activeTab === "qr" ? "bg-muted text-foreground" : "text-hr-text hover:bg-muted/50"
              )}
            >
              <List className="w-4 h-4" />
              QR Code
            </button>
          </div>

          {/* Right content */}
          <div className="flex-1">
            {activeTab === "general" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">General</h2>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Total Hours Calculation <span className="text-destructive">*</span>
                    </label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>Every Valid Check-in & Check-out</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Attendance Start Date <span className="text-destructive">*</span>
                    </label>
                    <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      11 Feb 2023
                      <CalendarDays className="w-4 h-4 text-hr-text-light" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Attendance Approval Cycle <span className="text-destructive">*</span>
                      </label>
                      <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>1</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">&nbsp;</label>
                      <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Repeat On <span className="text-destructive">*</span>
                      </label>
                      <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>Monthly on Day 11</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Location <span className="text-destructive">*</span>
                      </label>
                      <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>All Offices</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Location & Policy</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">Unpixel Office</h3>
                    <button className="text-hr-text-light hover:text-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Clocking in/out from", value: "Desktop, Mobile" },
                      { label: "QR Code", value: "Yes" },
                      { label: "Geofencing", value: "Active" },
                      { label: "Accurate Address", value: "100 Queen St W, Toronto, ON M5H 2N3, Kanada" },
                      { label: "Radius", value: "1 kilometers" },
                      { label: "Policy", value: "Not allow clock in/out outside the office" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-8">
                        <span className="text-sm text-hr-text-light w-40 flex-shrink-0">{item.label}</span>
                        <span className="text-sm font-medium text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "qr" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-2">QR Code</h2>
                <p className="text-sm text-hr-text-light mb-6">
                  Generate a QR code to let everyone clock in / out easily by scanning with the GroveHR app{" "}
                  <span className="text-hr-teal font-medium cursor-pointer">Start displaying QR Code.</span>
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Auto generate new QR code every <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>5</option>
                      </select>
                      <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                        <option>Second</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Security Type <span className="text-destructive">*</span>
                    </label>
                    <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                      <option>Public URL for Everyone</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
                      Generate QR Code
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AttendanceSettings;
