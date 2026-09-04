import { useState } from "react";
import SettingsLayout from "./SettingsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Search, ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react";

const schedules = [
  {
    name: "Mon-Fri, Duration 40 hours/week",
    isDefault: true,
    active: true,
    hoursPerDay: "8h 00m",
    effectiveFrom: "01 Jan 2023",
    scheduleType: "Duration-based",
    totalHours: "40h 00m",
    days: [
      { day: "Monday", hours: "8h 00m" },
      { day: "Tuesday", hours: "8h 00m" },
      { day: "Tuesday", hours: "8h 00m" },
      { day: "Wednesday", hours: "8h 00m" },
      { day: "Thursday", hours: "8h 00m" },
      { day: "Friday", hours: "7h 00m" },
    ],
  },
  {
    name: "Mon-Fri, Duration 35 hours/week",
    isDefault: false,
    active: false,
    hoursPerDay: "7h 00m",
    effectiveFrom: "01 Jan 2023",
    scheduleType: "Duration-based",
    totalHours: "35h 00m",
    days: [],
  },
];

const WorkScheduleSettings = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [expanded, setExpanded] = useState<number>(0);
  const [scheduleType, setScheduleType] = useState("duration");

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <SettingsLayout activeTab="/settings/work-schedule">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Work Schedule</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input placeholder="Search job title" className="w-48 pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <Button onClick={() => setShowAdd(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add New
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {schedules.map((schedule, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-foreground">{schedule.name}</h3>
                    {schedule.isDefault && (
                      <span className="text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded uppercase">Default</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked={schedule.active} />
                    <button onClick={() => setExpanded(expanded === idx ? -1 : idx)}>
                      {expanded === idx ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                    </button>
                  </div>
                </div>

                {expanded === idx && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Standard working hours/day</span>
                      <span className="text-sm font-medium text-foreground">{schedule.hoursPerDay}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Effective from</span>
                      <span className="text-sm font-medium text-foreground">{schedule.effectiveFrom}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Schedule type</span>
                      <span className="text-sm font-medium text-foreground">{schedule.scheduleType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total working hours/week</span>
                      <span className="text-sm font-medium text-foreground">{schedule.totalHours}</span>
                    </div>
                    {schedule.days.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Daily working hours</span>
                        <div className="mt-2 space-y-1">
                          {schedule.days.map((d, i) => (
                            <div key={i} className="flex items-center justify-between pl-4">
                              <span className="text-sm font-medium text-foreground">{d.day}</span>
                              <span className="text-sm text-muted-foreground">{d.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Sheet open={showAdd} onOpenChange={setShowAdd}>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader><SheetTitle>Add New Work Schedule</SheetTitle></SheetHeader>
            <div className="space-y-5 mt-6">
              <div className="space-y-2">
                <Label>Schedule Name <span className="text-destructive">*</span></Label>
                <Input defaultValue="Remote Work" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Effective from <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input defaultValue="09 Mar 2023" className="pr-10" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Standard working hours/day</Label>
                  <div className="relative">
                    <Input defaultValue="8h 00m" className="pr-10" />
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Schedule type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setScheduleType("duration")}
                    className={`p-4 rounded-xl border text-left ${scheduleType === "duration" ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">Duration-based</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${scheduleType === "duration" ? "border-primary" : "border-muted-foreground"}`}>
                        {scheduleType === "duration" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Schedule based on a duration without a start and end time. Any time clocked will be counted as paid time.</p>
                  </button>
                  <button
                    onClick={() => setScheduleType("clock")}
                    className={`p-4 rounded-xl border text-left ${scheduleType === "clock" ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">Clock-based</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${scheduleType === "clock" ? "border-primary" : "border-muted-foreground"}`}>
                        {scheduleType === "clock" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Schedule with a fixed start and end time. Only time clocked during the schedule will be counted as paid time.</p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Working Time</Label>
                <div className="border border-border rounded-xl overflow-hidden">
                  <div className="grid grid-cols-2 bg-muted px-4 py-2">
                    <span className="text-xs font-medium text-muted-foreground">Working Day</span>
                    <span className="text-xs font-medium text-muted-foreground">Time</span>
                  </div>
                  {weekDays.map((day) => (
                    <div key={day} className="grid grid-cols-2 items-center px-4 py-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Switch defaultChecked={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(day)} />
                        <span className="text-sm text-foreground">{day}</span>
                      </div>
                      <div className="relative">
                        <Input defaultValue="8h 00" className="pr-10" />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-foreground">Total Working Time : <span className="text-primary font-semibold">40h 00m</span></p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
                <Button className="flex-1" onClick={() => setShowAdd(false)}>Create</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </SettingsLayout>
  );
};

export default WorkScheduleSettings;
