import SettingsLayout from "@/components/layout/SettingsLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IntegrationSettingsProps {
  activeTab?: string;
}

const integrations = [
  {
    name: "Workable",
    tag: "ATS",
    desc: "More than an applicant tracking system, Workable's talent acquisition software helps teams find candidates, evaluate applicants and make the right hire.",
    color: "bg-purple-100 text-purple-600",
    icon: "W",
  },
  {
    name: "Lever",
    tag: "ATS",
    desc: "With an applicant tracking system and robust candidate relationship management system in one platform, Lever is the ideal solution for small and medium-sized businesses, but robust enough for enterprises.",
    color: "bg-emerald-100 text-emerald-600",
    icon: "L",
  },
];

const IntegrationSettings = ({ activeTab }: IntegrationSettingsProps) => {
  return (
    <SettingsLayout activeTab="/settings/integration">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Integration</h2>
          <Select defaultValue="ats">
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ats">Applicant Tracking System</SelectItem>
              <SelectItem value="payroll">Payroll System</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {integrations.map((i) => (
            <Card key={i.name}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${i.color} flex items-center justify-center text-lg font-bold flex-shrink-0`}>
                  {i.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground">{i.name}</h3>
                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">{i.tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
                </div>
                <Switch />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
};

export default IntegrationSettings;
