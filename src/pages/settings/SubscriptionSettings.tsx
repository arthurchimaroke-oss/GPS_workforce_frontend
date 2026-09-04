import { useState } from "react";
import SettingsLayout from "@/components/layout/SettingsLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const history = [
  { plan: "Perform Plan", status: "UNPAID", statusColor: "bg-destructive/10 text-destructive", cycle: 3, created: "20 Jan 2023", end: "20 Apr 2023" },
  { plan: "Perform Plan", status: "PAID OFF", statusColor: "bg-pink-100 text-pink-600", cycle: 2, created: "20 Jan 2023", end: "20 Apr 2023" },
  { plan: "Perform Plan", status: "PAID OFF", statusColor: "bg-pink-100 text-pink-600", cycle: 1, created: "20 Jan 2023", end: "20 Apr 2023" },
  { plan: "Free Plan", status: "NOT ACTIVE", statusColor: "bg-muted text-muted-foreground", cycle: 0, created: "01 Jan 2023", end: "19 Jan 2023" },
];

const plans = [
  {
    name: "Essentials Plan",
    desc: "Start centralizing and automating your Core HR operations.",
    price: "$3",
    features: ["Core HR", "Time Off & Attendance", "Remote Onboarding", "Recruitment", "Mobile App (Employee Self-Services)", "Integration"],
    tag: null,
  },
  {
    name: "Perform Plan",
    desc: "Start enabling your employees' performance across agile teams.",
    price: "$4",
    features: ["Self Reviews", "Org-based Reviews", "Project-based Reviews", "Automated Review Schedule", "Built-in Review Templates"],
    tag: "RECOMENDATION",
    tagColor: "bg-primary text-primary-foreground",
  },
  {
    name: "Engage Plan",
    desc: "Start building an engaging and distributed work culture.",
    price: "$6",
    features: ["Peer Feedback & Recognition", "Polls & Pulse Surveys", "Company Social Feed", "Interest Groups", "Instant Messages"],
    tag: "BEST VALUE",
    tagColor: "bg-orange-500 text-white",
  },
];

const SubscriptionSettings = ({ activeTab }: SubscriptionSettingsProps) => {
  const [showPlanPicker, setShowPlanPicker] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  return (
    <SettingsLayout activeTab="/settings/subscription">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Subscription</h2>
          <Button onClick={() => setShowPlanPicker(true)}>Upgrade Plan</Button>
        </div>

        <Tabs defaultValue="plan">
          <TabsList>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Perform Plan</h3>
                  <span className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded font-medium">ACTIVE</span>
                </div>
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current employees</span>
                    <span className="text-foreground font-medium">100 Employee</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-foreground font-medium">$400</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Billing cycle</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((h, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm font-medium text-foreground">{h.plan}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] font-medium px-2 py-1 rounded ${h.statusColor}`}>{h.status}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{h.cycle}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{h.created}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{h.end}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" className="bg-muted">1</Button>
              <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Pick a Plan Sheet */}
        <Sheet open={showPlanPicker} onOpenChange={setShowPlanPicker}>
          <SheetContent className="sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Pick a Plan</SheetTitle>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">MONTHLY</span>
                <div className="w-10 h-5 bg-primary rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                </div>
                <span className="font-medium text-foreground">ANNUAL</span>
                <span className="text-[10px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded font-medium">SAVE 20%</span>
              </div>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {plans.map((plan) => (
                <Card key={plan.name}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">{plan.name}</h3>
                        {plan.tag && (
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${plan.tagColor}`}>{plan.tag}</span>
                        )}
                      </div>
                      <Button size="sm" onClick={() => setSelectedPlan(plan)}>Pick Plan</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{plan.desc}</p>
                    <div className="border-t border-border pt-3">
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-2xl font-bold text-primary">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/Employee/month</span>
                      </div>
                      <div className="space-y-2">
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-accent" />
                            <span className="text-foreground">{f}</span>
                          </div>
                        ))}
                      </div>
                      {plan.tag === "RECOMENDATION" && (
                        <p className="text-xs text-muted-foreground mt-3">14-day free trial • No credit card required</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Amount of Subscription Sheet */}
        <Sheet open={!!selectedPlan} onOpenChange={(open) => !open && setSelectedPlan(null)}>
          <SheetContent className="sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Amount of subscription</SheetTitle>
            </SheetHeader>

            {selectedPlan && (
              <div className="space-y-6 mt-6">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground">{selectedPlan.name}</h3>
                      {selectedPlan.tag && (
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${selectedPlan.tagColor}`}>{selectedPlan.tag}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{selectedPlan.desc}</p>
                    <div className="border-t border-border pt-3">
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-2xl font-bold text-primary">{selectedPlan.price}</span>
                        <span className="text-sm text-muted-foreground">/Employee/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {selectedPlan.name === "Engage Plan" ? "Perform plan, plus Employee Engagement features" : `Essentials plan, plus Performance Enablement features`}
                      </p>
                      <div className="space-y-2">
                        {selectedPlan.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-accent" />
                            <span className="text-foreground">{f}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">14-day free trial • No credit card required</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Number of employees <span className="text-destructive">*</span></Label>
                    <Input type="number" defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Billing Circle <span className="text-destructive">*</span></Label>
                    <Select defaultValue="annual">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Unit price: $72 / employee / year</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedPlan(null)}>Cancel</Button>
                  <Button className="flex-1" onClick={() => { setSelectedPlan(null); setShowPlanPicker(false); window.location.href = "/settings/payment"; }}>Continue</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </SettingsLayout>
  );
};

export default SubscriptionSettings;
