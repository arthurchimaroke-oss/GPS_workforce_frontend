import { useState } from "react";
import SettingsLayout from "@/components/layout/SettingsLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordProps {
  activeTab?: string;
}

const ChangePassword = ({ activeTab }: ChangePasswordProps) => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SettingsLayout activeTab="/settings/password">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Change Password</h2>
        <div className="border-b border-border mb-6" />

        <Card>
          <CardContent className="p-6 space-y-5 max-w-lg">
            <div className="space-y-2">
              <Label>Old Password <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Input type={showOld ? "text" : "password"} defaultValue="password123" className="pr-10" />
                <button onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showOld ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>New Password <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Input type={showNew ? "text" : "password"} defaultValue="newpassword" className="pr-10" />
                <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showNew ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Confirm Password <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Input type={showConfirm ? "text" : "password"} defaultValue="newpassword" className="pr-10" />
                <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showConfirm ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button className="px-10">Save</Button>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default ChangePassword;
