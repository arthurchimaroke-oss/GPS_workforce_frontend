import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Save, Upload, Camera } from "lucide-react";

const ProfileSettings = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your personal information and preferences</p>
          </div>
          <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">P</div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-accent rounded-full flex items-center justify-center text-accent-foreground shadow-md">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-2" /> Upload Photo</Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>First Name</Label><Input defaultValue="Patrick" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Miller" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="patrick.miller@company.com" /></div>
              <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+1 (555) 123-4567" /></div>
              <div className="space-y-2"><Label>Department</Label><Input defaultValue="Engineering" disabled className="bg-muted" /></div>
              <div className="space-y-2"><Label>Job Title</Label><Input defaultValue="Senior Software Engineer" disabled className="bg-muted" /></div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea defaultValue="Passionate about building great products and mentoring junior developers." rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" /></div>
            </div>
            <Button variant="outline">Update Password</Button>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" size="sm">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default ProfileSettings;
