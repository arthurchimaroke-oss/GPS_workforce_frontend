import SettingsLayout from "./SettingsLayout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { companyProfile } from "./organizationData";
import { toast } from "@/components/ui/use-toast";
import { Building2, CheckCircle2, ShieldCheck, Workflow } from "lucide-react";

const CompanyInfoSettings = () => {
  const [profile, setProfile] = useState(companyProfile);

  const updateProfile = (field: keyof typeof companyProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Company profile updated",
      description: "The organization profile has been saved locally for the current frontend flow.",
    });
  };

  return (
    <SettingsLayout activeTab="/settings/company">
      <div className="space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                Company Profile
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Set the operating context for your organization.</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                GPS uses this profile as the top-level tenant identity. Entities, users, roles, and permissions all sit under this company, so administrators should land here first before building access.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px]">
              <div className="rounded-2xl border border-border bg-background p-4">
                <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-600" />
                <p className="text-sm font-semibold text-foreground">Step 1</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Define the company profile used across the administration console.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <Workflow className="mb-3 h-5 w-5 text-sky-700" />
                <p className="text-sm font-semibold text-foreground">Then create entities</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Each entity becomes an operational boundary for people and payroll.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-violet-700" />
                <p className="text-sm font-semibold text-foreground">Access is scoped</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Users see only the entities and permissions assigned to them.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardHeader>
              <CardTitle>Company profile</CardTitle>
              <CardDescription>
                Company and acting user identifiers come from the authenticated session. Administrators only manage business-facing fields here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input value={profile.name} onChange={(event) => updateProfile("name", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Company Website</Label>
                  <Input value={profile.website} onChange={(event) => updateProfile("website", event.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <div className="flex gap-2">
                    <Select value={profile.phoneCode} onValueChange={(value) => updateProfile("phoneCode", value)}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+234">+234</SelectItem>
                        <SelectItem value="+233">+233</SelectItem>
                        <SelectItem value="+254">+254</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input value={profile.phoneNumber} onChange={(event) => updateProfile("phoneNumber", event.target.value)} className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input value={profile.email} onChange={(event) => updateProfile("email", event.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input value={profile.industry} onChange={(event) => updateProfile("industry", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Default operating model</Label>
                  <Input value="Multi-entity with role-based access" readOnly className="bg-muted/40" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company Overview</Label>
                <Textarea
                  rows={6}
                  value={profile.overview}
                  onChange={(event) => updateProfile("overview", event.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="px-8">Save Profile</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Implementation rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="font-medium text-foreground">Do not ask for company IDs</p>
                  <p className="mt-1 leading-6">Backend already derives the current company from the authenticated session.</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="font-medium text-foreground">Entities drive user access</p>
                  <p className="mt-1 leading-6">A user may belong to one or more entities. Login should expose only those entities.</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="font-medium text-foreground">Roles stay reusable</p>
                  <p className="mt-1 leading-6">Create roles once, then attach permissions and assign them to many users.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default CompanyInfoSettings;
