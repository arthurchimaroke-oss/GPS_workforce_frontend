import { useState } from "react";
import EmployeeSidebarLayout from "@/components/layout/EmployeeSidebarLayout";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  MapPin,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statCards = [
  { label: "Work Schedule", value: "48 Hours" },
  { label: "Logged Time", value: "30 Hours" },
  { label: "Paid Time", value: "29 Hours" },
  { label: "Overtime", value: "1 Hours" },
];

const attendanceData = [
  { date: "01 Mar 2023", clockIn: "08:00 (GMT+7)", clockInLoc: "Semarang, Indonesia", clockOut: "14:30 (GMT+7)", clockOutLoc: "Semarang, Indonesia", schedule: "8h", logged: "8 h 30m", paid: "8h", deficit: "+ 30m", overtime: "30m", status: "PENDING", expandable: true },
  { date: "01 Mar 2023", clockIn: "08:00 (GMT+7)", clockInLoc: "Semarang, Indonesia", clockOut: "14:30 (GMT+7)", clockOutLoc: "Semarang, Indonesia", schedule: "8h", logged: "8 h 30m", paid: "8h", deficit: "+ 30m", overtime: "30m", status: "PENDING", expandable: true },
  { date: "01 Mar 2023", clockIn: "08:00 (GMT+7)", clockInLoc: "Semarang, Indonesia", clockOut: "14:30 (GMT+7)", clockOutLoc: "Semarang, Indonesia", schedule: "8h", logged: "8 h 30m", paid: "8h", deficit: "+ 30m", overtime: "30m", status: "PENDING", expandable: false },
  { date: "01 Mar 2023", clockIn: "08:00 (GMT+7)", clockInLoc: "Semarang, Indonesia", clockOut: "14:30 (GMT+7)", clockOutLoc: "Semarang, Indonesia", schedule: "8h", logged: "8 h 30m", paid: "8h", deficit: "+ 30m", overtime: "30m", status: "PENDING", expandable: false },
  { date: "01 Mar 2023", clockIn: "08:00 (GMT+7)", clockInLoc: "Semarang, Indonesia", clockOut: "14:30 (GMT+7)", clockOutLoc: "Semarang, Indonesia", schedule: "8h", logged: "8 h 30m", paid: "8h", deficit: "+ 30m", overtime: "30m", status: "PENDING", expandable: false },
];

const MyAttendance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showClockOut, setShowClockOut] = useState(false);
  const [showEditPaid, setShowEditPaid] = useState(false);
  const [clockOutNote, setClockOutNote] = useState("");
  const [editNote, setEditNote] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(true);

  return (
    <EmployeeSidebarLayout>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Attendance</h1>
            <p className="text-sm text-hr-text-light">Manage your Attendance</p>
          </div>
          {isClockedIn ? (
            <button
              onClick={() => setShowClockOut(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-destructive text-white text-sm font-medium hover:opacity-90"
            >
              <Clock className="w-4 h-4" />
              Check Out 8h 00m 05s
            </button>
          ) : (
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
              <Clock className="w-4 h-4" />
              Check In 00h 00m 05s
            </button>
          )}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {statCards.map((card) => (
            <div key={card.label} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">{card.label}</h3>
                <Info className="w-4 h-4 text-hr-text-light" />
              </div>
              <p className="text-lg font-bold text-foreground">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-3 bg-hr-teal/10 border border-hr-teal/20 rounded-xl px-4 py-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-hr-teal flex items-center justify-center text-white flex-shrink-0">
            <Info className="w-3.5 h-3.5" />
          </div>
          <p className="text-sm text-hr-text">You can only update the attendance record within the last 31 days.</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            01 Jan 2023 - 10 Mar 2023
            <CalendarDays className="w-4 h-4 text-hr-text-light" />
          </div>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Record</option>
          </select>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Location</option>
          </select>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Status</option>
          </select>
        </div>

        {/* Attendance Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-hr-text-light">
                  <th className="text-left py-3 px-4 font-medium">Date ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Clock In ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Clock In Location</th>
                  <th className="text-left py-3 px-4 font-medium">Clock Out ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Clock Out Location</th>
                  <th className="text-left py-3 px-4 font-medium">Work Schedule</th>
                  <th className="text-left py-3 px-4 font-medium">Logged Time</th>
                  <th className="text-left py-3 px-4 font-medium">Paid Time</th>
                  <th className="text-left py-3 px-4 font-medium">Deficit</th>
                  <th className="text-left py-3 px-4 font-medium">Overtime</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Note</th>
                  <th className="text-left py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground">
                      <div className="flex items-center gap-1.5">
                        {row.expandable && <ChevronDown className="w-3.5 h-3.5 text-hr-text-light" />}
                        {row.date}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{row.clockIn}</td>
                    <td className="py-3 px-4 text-hr-text">
                      <div className="flex items-center gap-1.5">
                        {row.clockInLoc}
                        <MapPin className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{row.clockOut}</td>
                    <td className="py-3 px-4 text-hr-text">
                      <div className="flex items-center gap-1.5">
                        {row.clockOutLoc}
                        <MapPin className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{row.schedule}</td>
                    <td className="py-3 px-4 text-hr-text">{row.logged}</td>
                    <td className="py-3 px-4 text-hr-text">{row.paid}</td>
                    <td className="py-3 px-4 text-hr-text">{row.deficit}</td>
                    <td className="py-3 px-4 text-hr-text">{row.overtime}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-100 text-yellow-700">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-hr-text">-</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setShowEditPaid(true)}
                        className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:opacity-80"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              {[1, 2, 3].map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={cn("w-8 h-8 rounded flex items-center justify-center text-sm font-medium", currentPage === p ? "bg-hr-navy text-white" : "text-hr-text hover:bg-muted")}>{p}</button>
              ))}
              <span className="px-1 text-hr-text-light">...</span>
              <button className="w-8 h-8 rounded flex items-center justify-center text-sm text-hr-text hover:bg-muted">10</button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 text-sm text-hr-text-light">
              <span>Showing 1 to 8 of 50 entries</span>
              <span className="font-medium text-foreground">Show 8 ▴</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clock Out Popup */}
      {showClockOut && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowClockOut(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-card rounded-xl shadow-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Clock out at 08:00:05</h2>
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-hr-text-light" />
              <span className="text-sm text-hr-text">Your total working time for today is</span>
              <span className="text-sm font-bold text-foreground">08h 00m 05s</span>
            </div>
            <div className="mb-5">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Notes</label>
              <input
                value={clockOutNote}
                onChange={(e) => setClockOutNote(e.target.value)}
                placeholder="Input notes here"
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal"
              />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowClockOut(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
              <button
                onClick={() => { setShowClockOut(false); setIsClockedIn(false); }}
                className="flex-1 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90"
              >
                Clock Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Paid Time Popup */}
      {showEditPaid && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowEditPaid(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-card rounded-xl shadow-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Edit Paid Time</h2>
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-hr-text-light" />
              <span className="text-sm text-hr-text">Your total working time for today is</span>
              <span className="text-sm font-bold text-foreground">08h 00m 05s</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                11 Apr 2023
                <CalendarDays className="w-4 h-4 text-hr-text-light" />
              </div>
              <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text-light">
                00:00
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mb-5">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Notes</label>
              <input
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="Input notes here"
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal"
              />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowEditPaid(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => setShowEditPaid(false)} className="flex-1 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Save</button>
            </div>
          </div>
        </>
      )}
    </EmployeeSidebarLayout>
  );
};

export default MyAttendance;
